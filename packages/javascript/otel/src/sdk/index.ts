import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
import { Resource } from "@opentelemetry/resources";
import {
  BasicTracerProvider,
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  SpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
  Configuration,
  INFRASTACK_API_KEY_HEADER,
  Instrumentation,
  LLMOptions,
  Protocol,
  Tag,
} from "../configuration";
import {
  ANTHROPIC_ENABLED,
  ANTHROPIC_TRACE_CONTENT,
  INFRASTACK_API_KEY,
  INFRASTACK_DEVELOPMENT_MODE,
  INFRASTACK_DISABLED_INSTRUMENTATIONS,
  INFRASTACK_LOGS_ENABLED,
  INFRASTACK_TAGS,
  OPENAI_ENABLED,
  OPENAI_TRACE_CONTENT,
  OTEL_EXPORTER_OTLP_ENDPOINT,
  OTEL_EXPORTER_OTLP_HEADERS,
  OTEL_EXPORTER_OTLP_PROTOCOL,
  OTEL_K8S_NAMESPACE,
  OTEL_K8S_POD_NAME,
  OTEL_SERVICE_NAME,
  OTEL_SERVICE_VERSION,
} from "../environment";
import { getInfrastackAutoInstrumentations } from "../utils/auto-instrumentation";
import { generateRandomServiceName } from "../utils/service-name";
import { CompositeSpanProcessor } from "../utils/span-processor";

const ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
const ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
const ATTR_K8S_POD_NAME = "k8s.pod.name";

export class InfrastackSDK {
  private readonly configuration: Configuration;

  constructor(config?: Partial<Configuration>) {
    this.configuration = this.mergeOptionsWithEnvVars(config);
  }

  public init(): void {
    this.performInitialLogging();
    this.validateConfiguration();

    const exporterOptions = this.getExporterOptions();
    let traceExporter;
    if (this.configuration.protocol === Protocol.GRPC) {
      try {
        const grpcExporter = require("@opentelemetry/exporter-trace-otlp-grpc");
        traceExporter = new grpcExporter.OTLPTraceExporter(exporterOptions);
      } catch (error) {
        console.warn(
          "Failed to load grpc exporter, falling back to HTTP exporter."
        );
        if (this.configuration.endpoint.includes("infrastack.ai")) {
          process.env[OTEL_EXPORTER_OTLP_ENDPOINT] =
            "https://collector-http.infrastack.ai";
        }
        traceExporter = new OTLPTraceExporter(exporterOptions);
      }
    } else {
      traceExporter = new OTLPTraceExporter(exporterOptions);
    }
    const resource = this.createResource();
    const spanProcessor = this.createSpanProcessors(traceExporter);

    const provider = new BasicTracerProvider({
      resource,
    });
    provider.addSpanProcessor(spanProcessor);
    provider.register({
      propagator: new CompositePropagator({
        propagators: [
          new W3CTraceContextPropagator(),
          new W3CBaggagePropagator(),
        ],
      }),
    });

    registerInstrumentations({
      instrumentations: [
        getInfrastackAutoInstrumentations(
          this.configuration.disabledInstrumentations,
          this.configuration.llmOptions
        ),
      ],
    });

    this.logInitializationComplete();
  }

  private mergeOptionsWithEnvVars(
    providedConfig?: Partial<Configuration>
  ): Configuration {
    const envTags = this.parseEnvTags();
    const isDevelopmentMode = this.determineDevelopmentMode(
      providedConfig?.isDevelopmentMode
    );
    const disabledInstrumentationsEnv = this.parseDisabledInstrumentations();
    const protocol =
      providedConfig?.protocol ??
      (process.env[OTEL_EXPORTER_OTLP_PROTOCOL] as Protocol) ??
      Protocol.GRPC;
    const llmOptions = this.mergeLLMOptions(providedConfig?.llmOptions);

    return {
      serviceName:
        providedConfig?.serviceName ??
        process.env[OTEL_SERVICE_NAME] ??
        generateRandomServiceName(),
      serviceVersion:
        providedConfig?.serviceVersion ??
        process.env[OTEL_SERVICE_VERSION] ??
        "0.0.1",
      podNamespace:
        providedConfig?.podNamespace ?? process.env[OTEL_K8S_NAMESPACE] ?? "",
      podName: providedConfig?.podName ?? process.env[OTEL_K8S_POD_NAME] ?? "",
      logsEnabled:
        providedConfig?.logsEnabled ??
        process.env[INFRASTACK_LOGS_ENABLED] !== "false",
      tags: providedConfig?.tags ?? envTags,
      isDevelopmentMode,
      endpoint: this.determineEndpoint(providedConfig?.endpoint, protocol),
      apiKey: this.determineApiKey(providedConfig?.apiKey),
      disabledInstrumentations:
        providedConfig?.disabledInstrumentations ??
        disabledInstrumentationsEnv ??
        [],
      protocol,
      llmOptions,
    };
  }

  private mergeLLMOptions(
    providedLLMOptions?: Partial<LLMOptions>
  ): LLMOptions {
    const defaultLLMOptions: LLMOptions = {
      openai: { enabled: true, traceContent: true },
      anthropic: { enabled: true, traceContent: true },
    };

    const envLLMOptions: Partial<LLMOptions> = {
      openai: {
        enabled: process.env[OPENAI_ENABLED]?.toLowerCase() !== "false",
        traceContent:
          process.env[OPENAI_TRACE_CONTENT]?.toLowerCase() !== "false",
      },
      anthropic: {
        enabled: process.env[ANTHROPIC_ENABLED]?.toLowerCase() !== "false",
        traceContent:
          process.env[ANTHROPIC_TRACE_CONTENT]?.toLowerCase() !== "false",
      },
    };

    const mergedOptions: LLMOptions = { ...defaultLLMOptions };

    for (const service of ["openai", "anthropic"] as const) {
      if (providedLLMOptions?.[service] || envLLMOptions[service]) {
        mergedOptions[service] = {
          ...defaultLLMOptions[service],
          ...envLLMOptions[service],
          ...providedLLMOptions?.[service],
        };
      }
    }

    return mergedOptions;
  }

  private parseEnvTags(): Tag[] {
    const envTags = process.env[INFRASTACK_TAGS];
    if (!envTags) return [];
    try {
      return JSON.parse(envTags);
    } catch (error) {
      throw new Error("Failed to parse INFRASTACK_TAGS environment variable");
    }
  }

  private parseDisabledInstrumentations(): Instrumentation[] {
    const envDisabledInstrumentations =
      process.env[INFRASTACK_DISABLED_INSTRUMENTATIONS];
    if (!envDisabledInstrumentations) return [];
    try {
      return JSON.parse(envDisabledInstrumentations);
    } catch (error) {
      throw new Error(
        "Failed to parse INFRASTACK_DISABLED_INSTRUMENTATIONS environment variable"
      );
    }
  }

  private determineDevelopmentMode(providedDevelopmentMode?: boolean): boolean {
    const isDevelopmentMode =
      process.env[INFRASTACK_DEVELOPMENT_MODE]?.toLowerCase() === "true";
    if (providedDevelopmentMode) return providedDevelopmentMode;
    return isDevelopmentMode ?? false;
  }

  private determineEndpoint(
    providedEndpoint?: string,
    protocol?: Protocol
  ): string {
    if (protocol === Protocol.GRPC) {
      return (
        providedEndpoint ??
        process.env[OTEL_EXPORTER_OTLP_ENDPOINT] ??
        "https://collector.infrastack.ai"
      );
    }
    return (
      providedEndpoint ??
      process.env[OTEL_EXPORTER_OTLP_ENDPOINT] ??
      "https://collector-http.infrastack.ai"
    );
  }

  private determineApiKey(providedApiKey?: string): string {
    return (
      providedApiKey ??
      process.env[INFRASTACK_API_KEY] ??
      this.extractApiKeyFromHeaders() ??
      ""
    );
  }

  private extractApiKeyFromHeaders(): string | undefined {
    const headers = process.env[OTEL_EXPORTER_OTLP_HEADERS];
    if (!headers) return undefined;
    const match = headers.match(/infrastack-api-key=([^,\s]+)/);
    return match ? match[1] : undefined;
  }

  private validateConfiguration(): void {
    if (
      this.configuration.endpoint.includes("infrastack.ai") &&
      !this.configuration.apiKey
    ) {
      throw new Error(
        "🔐 API Key is missing for infrastack.ai, registration will not proceed."
      );
    }
  }

  private getExporterOptions() {
    if (this.configuration.endpoint.includes("infrastack.ai")) {
      process.env[OTEL_EXPORTER_OTLP_HEADERS] =
        process.env[OTEL_EXPORTER_OTLP_HEADERS] ?? "";
      process.env[
        OTEL_EXPORTER_OTLP_HEADERS
      ] += `infrastack-api-key=${this.configuration.apiKey}`;
      process.env[OTEL_EXPORTER_OTLP_ENDPOINT] =
        this.configuration.endpoint.split("/v1/traces")[0];
      return { compression: CompressionAlgorithm.GZIP };
    }
    const options: Record<string, any> = {
      url: this.configuration.endpoint,
    };
    if (this.configuration.apiKey) {
      options.headers = {
        [INFRASTACK_API_KEY_HEADER]: this.configuration.apiKey,
      };
    }
    return options;
  }

  private createResource(): Resource {
    const attributes = {
      [ATTR_SERVICE_NAME]: this.configuration.serviceName,
      [ATTR_SERVICE_VERSION]: this.configuration.serviceVersion,
      [ATTR_SERVICE_INSTANCE_ID]: this.configuration.podName,
      [ATTR_K8S_NAMESPACE_NAME]: this.configuration.podNamespace,
      [ATTR_K8S_POD_NAME]: this.configuration.podName,
      ...Object.fromEntries(
        this.configuration.tags.map((tag) => [tag.key, tag.value])
      ),
    };
    return new Resource(attributes);
  }

  private createSpanProcessors(
    traceExporter: OTLPTraceExporter
  ): SpanProcessor {
    if (this.configuration.isDevelopmentMode) {
      const spanProcessor = new CompositeSpanProcessor([
        new SimpleSpanProcessor(new ConsoleSpanExporter()),
        new SimpleSpanProcessor(traceExporter),
      ]);
      return spanProcessor;
    }
    return new CompositeSpanProcessor([new BatchSpanProcessor(traceExporter)]);
  }

  private performInitialLogging(): void {
    if (this.configuration.isDevelopmentMode) {
      console.warn(
        "⚠️ Development mode is enabled. Make sure not to deploy this to production."
      );
      this.logDevelopmentMode();
    }
    if (!this.configuration.logsEnabled) return;
    this.logConfigurationDetails();
  }

  private logConfigurationDetails(): void {
    if (!this.configuration.logsEnabled) return;

    console.info("Exporter endpoint is set as:", this.configuration.endpoint);
    if (this.configuration.apiKey) {
      const obfuscatedKey = `${this.configuration.apiKey.slice(
        0,
        4
      )}*****${this.configuration.apiKey.slice(-4)}`;
      console.info("Found an API Key:", obfuscatedKey);
    }
    console.info("Service name is set as:", this.configuration.serviceName);
    console.info(
      "Service version is set as:",
      this.configuration.serviceVersion
    );
    if (this.configuration.podNamespace) {
      console.info("Pod namespace is set as:", this.configuration.podNamespace);
    }
    if (this.configuration.podName) {
      console.info("Pod name is set as:", this.configuration.podName);
    }
    if (this.configuration.tags.length > 0) {
      console.info("Tags are set as:", this.configuration.tags);
    }
  }

  private logDevelopmentMode(): void {
    if (!this.configuration.logsEnabled) return;
    console.info("🔍 Development mode enabled.");
    console.info(
      "You will be able to see the traces in the console as well as in the dashboard."
    );
  }

  private logInitializationComplete(): void {
    if (!this.configuration.logsEnabled) return;
    console.info("Application is now instrumented with infrastack.ai");
  }
}
