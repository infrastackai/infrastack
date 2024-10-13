import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { Configuration, Tag } from "../configuration";
import {
  INFRASTACK_API_KEY,
  INFRASTACK_DEVELOPMENT_MODE,
  INFRASTACK_LOGS_ENABLED,
  INFRASTACK_TAGS,
  OTEL_EXPORTER_OTLP_ENDPOINT,
  OTEL_EXPORTER_OTLP_HEADERS,
  OTEL_K8S_NAMESPACE,
  OTEL_K8S_POD_NAME,
  OTEL_SERVICE_NAME,
  OTEL_SERVICE_VERSION,
} from "../environment";

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
    this.setEnvironmentVariables();

    const traceExporter = new OTLPTraceExporter(this.getExporterOptions());
    const resource = this.createResource();
    const spanProcessors = this.createSpanProcessors(traceExporter);

    const otelSDK = new NodeSDK({
      traceExporter,
      resource,
      instrumentations: [this.getNodeAutoInstrumentations()],
      spanProcessors,
    });

    otelSDK.start();
    this.logInitializationComplete();
  }

  private mergeOptionsWithEnvVars(
    providedConfig?: Partial<Configuration>
  ): Configuration {
    const envTags = this.parseEnvTags();
    const isDevelopmentMode = this.determineDevelopmentMode(
      providedConfig?.isDevelopmentMode
    );

    return {
      serviceName:
        providedConfig?.serviceName ??
        process.env[OTEL_SERVICE_NAME] ??
        this.generateRandomServiceName(),
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
      endpoint: this.determineEndpoint(providedConfig?.endpoint),
      apiKey: this.determineApiKey(providedConfig?.apiKey),
    };
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

  private determineDevelopmentMode(providedDevelopmentMode?: boolean): boolean {
    const isDevelopmentMode =
      process.env[INFRASTACK_DEVELOPMENT_MODE]?.toLowerCase() === "true";
    if (providedDevelopmentMode) return providedDevelopmentMode;
    return isDevelopmentMode ?? false;
  }

  private determineEndpoint(providedEndpoint?: string): string {
    return (
      providedEndpoint ??
      process.env[OTEL_EXPORTER_OTLP_ENDPOINT] ??
      "https://collector.infrastack.ai"
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

  private setEnvironmentVariables(): void {
    if (this.configuration.endpoint.includes("infrastack.ai")) {
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT =
        "https://collector.infrastack.ai";
      process.env.OTEL_EXPORTER_OTLP_HEADERS = `infrastack-api-key=${this.configuration.apiKey}`;
    }
  }

  private getExporterOptions() {
    const options: Record<string, any> = {
      url: this.configuration.endpoint,
      compression: CompressionAlgorithm.GZIP,
    };
    if (this.configuration.apiKey) {
      options.headers = { [INFRASTACK_API_KEY]: this.configuration.apiKey };
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

  private createSpanProcessors(traceExporter: OTLPTraceExporter): any[] {
    if (this.configuration.isDevelopmentMode) {
      return [
        new SimpleSpanProcessor(new ConsoleSpanExporter()),
        new SimpleSpanProcessor(traceExporter),
      ];
    }
    return [new BatchSpanProcessor(traceExporter)];
  }

  private getNodeAutoInstrumentations() {
    return getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    });
  }

  private generateRandomServiceName(): string {
    const verbs = [
      "run",
      "jump",
      "fly",
      "swim",
      "dance",
      "sing",
      "explore",
      "build",
      "think",
      "create",
      "develop",
      "invent",
      "imagine",
      "design",
      "develop",
      "invent",
      "imagine",
    ];
    const adjectives = [
      "happy",
      "quick",
      "fuzzy",
      "tiny",
      "hero",
      "brave",
      "cool",
      "bright",
      "lucky",
      "silly",
      "witty",
      "funny",
      "quirky",
      "groovy",
    ];
    const nouns = [
      "octopus",
      "cloud",
      "dog",
      "cat",
      "bird",
      "unicorn",
      "tree",
      "rocket",
      "star",
      "budgie",
      "kitten",
      "puppy",
      "elephant",
      "tiger",
      "lion",
      "monkey",
      "penguin",
      "dolphin",
    ];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomVerb}-${randomAdjective}-${randomNoun}`;
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