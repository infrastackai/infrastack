import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import sinon from "sinon";
import { Instrumentation, Protocol } from "../configuration";
import {
  INFRASTACK_API_KEY,
  INFRASTACK_DEVELOPMENT_MODE,
  INFRASTACK_TAGS,
  OTEL_EXPORTER_OTLP_ENDPOINT,
  OTEL_EXPORTER_OTLP_HEADERS,
  OTEL_SERVICE_NAME,
} from "../environment";
import { InfrastackSDK } from "../sdk";
import { getInfrastackAutoInstrumentations } from "../utils/auto-instrumentation";
import { CompositeSpanProcessor } from "../utils/span-processor";

describe("InfrastackSDK", () => {
  let sdk: InfrastackSDK;

  beforeEach(() => {
    process.env[INFRASTACK_API_KEY] = "sk-test";
    sdk = new InfrastackSDK();
  });

  afterEach(() => {
    sinon.restore();
    delete process.env[INFRASTACK_TAGS];
    delete process.env[OTEL_SERVICE_NAME];
    delete process.env[INFRASTACK_DEVELOPMENT_MODE];
    delete process.env[OTEL_EXPORTER_OTLP_HEADERS];
    delete process.env[INFRASTACK_API_KEY];
    delete process.env[OTEL_EXPORTER_OTLP_ENDPOINT];
  });

  it("should initialize SDK with default options", () => {
    const initSpy = sinon.spy(InfrastackSDK.prototype, "init");
    sdk.init();
    expect(initSpy.calledOnce).toBe(true);
  });

  it("should log the correct warnings for development environment", () => {
    const consoleWarnStub = sinon.stub(console, "warn");
    sdk = new InfrastackSDK({ isDevelopmentMode: true });
    sdk.init();
    expect(consoleWarnStub.calledWithMatch(/Development mode is enabled/)).toBe(
      true
    );
  });

  it("should merge options with environment variables correctly", () => {
    process.env[OTEL_SERVICE_NAME] = "test-service";
    process.env[INFRASTACK_DEVELOPMENT_MODE] = "true";
    sdk = new InfrastackSDK({});
    expect(sdk["configuration"].serviceName).toBe("test-service");
    expect(sdk["configuration"].isDevelopmentMode).toBe(true);
  });

  it("should handle parsing error for INFRASTACK_TAGS", () => {
    process.env[INFRASTACK_TAGS] = "invalid-json";
    expect(() => {
      new InfrastackSDK({});
    }).toThrow("Failed to parse INFRASTACK_TAGS environment variable");
  });

  it("should create Resource correctly with provided options", () => {
    sdk = new InfrastackSDK({
      serviceName: "test-service",
      serviceVersion: "1.0.0",
      podNamespace: "test-namespace",
      podName: "test-pod",
      tags: [{ key: "env", value: "test" }],
    });

    const resource = sdk["createResource"]();
    expect(resource.attributes["service.name"]).toBe("test-service");
    expect(resource.attributes["service.version"]).toBe("1.0.0");
    expect(resource.attributes["k8s.namespace.name"]).toBe("test-namespace");
    expect(resource.attributes["k8s.pod.name"]).toBe("test-pod");
    expect(resource.attributes["env"]).toBe("test");
  });

  it("should log API key correctly if OTEL_EXPORTER_OTLP_HEADERS is set", () => {
    process.env[INFRASTACK_TAGS] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    process.env[OTEL_EXPORTER_OTLP_HEADERS] =
      "infrastack-api-key=mysecretapikey";
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({});
    sdk.init();
    expect(consoleInfoStub.calledWithMatch(/Found an API Key:/)).toBe(true);
  });

  it("should create CompositeSpanProcessor with ConsoleSpanExporter and SimpleSpanProcessor for development mode", () => {
    sdk = new InfrastackSDK({ isDevelopmentMode: true });
    const processor = sdk["createSpanProcessors"](new OTLPTraceExporter());
    expect(processor).toBeInstanceOf(CompositeSpanProcessor);

    // Access the internal processors using type assertion
    const compositeProcessor = processor as CompositeSpanProcessor;
    expect(compositeProcessor["processors"].length).toBe(2);

    const firstProcessor = compositeProcessor["processors"][0];
    const secondProcessor = compositeProcessor["processors"][1];

    expect(firstProcessor).toBeInstanceOf(SimpleSpanProcessor);
    expect((firstProcessor as SimpleSpanProcessor)["_exporter"]).toBeInstanceOf(
      ConsoleSpanExporter
    );

    expect(secondProcessor).toBeInstanceOf(SimpleSpanProcessor);
    expect(
      (secondProcessor as SimpleSpanProcessor)["_exporter"]
    ).toBeInstanceOf(OTLPTraceExporter);
  });

  it("should create BatchSpanProcessor for non-development mode", () => {
    sdk = new InfrastackSDK({ isDevelopmentMode: false });
    const processor = sdk["createSpanProcessors"](new OTLPTraceExporter());
    expect(processor).toBeInstanceOf(CompositeSpanProcessor);

    const compositeProcessor = processor as CompositeSpanProcessor;
    expect(compositeProcessor["processors"].length).toBe(1);

    const batchProcessor = compositeProcessor["processors"][0];
    expect(batchProcessor).toBeInstanceOf(BatchSpanProcessor);
  });

  it("should not log if logsEnabled is false", () => {
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({ logsEnabled: false });
    sdk.init();
    expect(consoleInfoStub.notCalled).toBe(true);
  });

  it("should fallback to infrastack.ai collector if endpoint is not provided in .env or in configuration", () => {
    sdk = new InfrastackSDK();
    expect(sdk["configuration"].endpoint).toBe(
      "https://collector.infrastack.ai"
    );
  });

  it("should not check for api key if endpoint is not related to infrastack.ai", () => {
    process.env[OTEL_EXPORTER_OTLP_ENDPOINT] = "https://localhost:4317";
    sdk = new InfrastackSDK({});
    expect(() => sdk.init()).not.toThrow();
  });

  it("should use the api key from OTEL headers env", () => {
    delete process.env[INFRASTACK_API_KEY];
    process.env[OTEL_EXPORTER_OTLP_HEADERS] =
      "infrastack-api-key=mysecretapikey";
    sdk = new InfrastackSDK({});
    sdk.init();
    expect(sdk["configuration"].apiKey).toBe("mysecretapikey");
  });

  it("should be started with just an API key", () => {
    delete process.env[INFRASTACK_API_KEY];
    delete process.env[OTEL_EXPORTER_OTLP_HEADERS];
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({ apiKey: "mysecretapikey" });
    sdk.init();
    expect(consoleInfoStub.calledWithMatch(/Found an API Key:/)).toBe(true);
    expect(
      consoleInfoStub.calledWithMatch(
        /Application is now instrumented with infrastack.ai/
      )
    ).toBe(true);
  });

  it("should use the provided endpoint in configuration", () => {
    const customEndpoint = "https://custom-collector.example.com";
    sdk = new InfrastackSDK({ endpoint: customEndpoint });
    expect(sdk["configuration"].endpoint).toBe(customEndpoint);
  });

  it("should use the OTEL_EXPORTER_OTLP_ENDPOINT environment variable if set", () => {
    const envEndpoint = "https://env-collector.example.com";
    process.env[OTEL_EXPORTER_OTLP_ENDPOINT] = envEndpoint;
    sdk = new InfrastackSDK();
    expect(sdk["configuration"].endpoint).toBe(envEndpoint);
  });

  it("should set OTEL_EXPORTER_OTLP_ENDPOINT and OTEL_EXPORTER_OTLP_HEADERS when using infrastack.ai endpoint", () => {
    const apiKey = "test-api-key";
    sdk = new InfrastackSDK({
      apiKey,
      endpoint: "https://collector.infrastack.ai",
    });
    sdk.init();
    expect(process.env.OTEL_EXPORTER_OTLP_ENDPOINT).toBe(
      "https://collector.infrastack.ai"
    );
    expect(process.env.OTEL_EXPORTER_OTLP_HEADERS).toBe(
      `infrastack-api-key=${apiKey}`
    );
  });

  it("should throw an error when using infrastack.ai endpoint without an API key", () => {
    delete process.env[INFRASTACK_API_KEY];
    sdk = new InfrastackSDK({ endpoint: "https://collector.infrastack.ai" });
    expect(() => sdk.init()).toThrow(
      "🔐 API Key is missing for infrastack.ai, registration will not proceed."
    );
  });

  it("should generate a random service name when not provided", () => {
    sdk = new InfrastackSDK();
    expect(sdk["configuration"].serviceName).toMatch(/^[a-z]+-[a-z]+-[a-z]+$/);
  });

  it("should use the provided service name", () => {
    const serviceName = "test-service";
    sdk = new InfrastackSDK({ serviceName });
    expect(sdk["configuration"].serviceName).toBe(serviceName);
  });

  it("should use the OTEL_SERVICE_NAME environment variable if set", () => {
    const envServiceName = "env-service";
    process.env[OTEL_SERVICE_NAME] = envServiceName;
    sdk = new InfrastackSDK();
    expect(sdk["configuration"].serviceName).toBe(envServiceName);
  });

  it("should log all configuration details when logsEnabled is true", () => {
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({
      logsEnabled: true,
      serviceName: "test-service",
      serviceVersion: "1.0.0",
      podNamespace: "test-namespace",
      podName: "test-pod",
      tags: [{ key: "env", value: "test" }],
    });
    sdk.init();
    expect(
      consoleInfoStub.calledWith("Service name is set as:", "test-service")
    ).toBe(true);
    expect(
      consoleInfoStub.calledWith("Service version is set as:", "1.0.0")
    ).toBe(true);
    expect(
      consoleInfoStub.calledWith("Pod namespace is set as:", "test-namespace")
    ).toBe(true);
    expect(consoleInfoStub.calledWith("Pod name is set as:", "test-pod")).toBe(
      true
    );
    expect(
      consoleInfoStub.calledWith("Tags are set as:", [
        { key: "env", value: "test" },
      ])
    ).toBe(true);
  });

  it("should use GRPC exporter by default", () => {
    sdk = new InfrastackSDK();
    expect(sdk["configuration"].protocol).toBe(Protocol.GRPC);
    expect(sdk["configuration"].endpoint).toBe(
      "https://collector.infrastack.ai"
    );
    const exporter = require("@opentelemetry/exporter-trace-otlp-grpc");
    const createSpanProcessorsSpy = jest.spyOn(
      sdk as any,
      "createSpanProcessors"
    );
    sdk.init();
    expect(createSpanProcessorsSpy).toHaveBeenCalledWith(
      expect.any(exporter.OTLPTraceExporter)
    );
  });

  it("should use HTTP exporter when protocol is HTTP", () => {
    sdk = new InfrastackSDK({ protocol: Protocol.HTTP });
    expect(sdk["configuration"].protocol).toBe(Protocol.HTTP);
    expect(sdk["configuration"].endpoint).toBe(
      "https://collector-http.infrastack.ai"
    );
    const exporter = require("@opentelemetry/exporter-trace-otlp-proto");
    const createSpanProcessorsSpy = jest.spyOn(
      sdk as any,
      "createSpanProcessors"
    );
    sdk.init();
    expect(createSpanProcessorsSpy).toHaveBeenCalledWith(
      expect.any(exporter.OTLPTraceExporter)
    );
  });

  it("should use auto instrumentation with all the default instrumentations", () => {
    const instrumentations = getInfrastackAutoInstrumentations([]);
    expect(instrumentations.length).toBe(Object.keys(Instrumentation).length);
  });

  it("should disable instrumentation via init configuration", () => {
    const disabledInstrumentations = [
      Instrumentation.EXPRESS,
      Instrumentation.MYSQL2,
    ];
    const instrumentations = getInfrastackAutoInstrumentations(
      disabledInstrumentations,
      {
        openai: { enabled: true, traceContent: true },
        anthropic: { enabled: true, traceContent: true },
      }
    );
    expect(instrumentations.length).toBe(
      Object.keys(Instrumentation).length - 2
    );
  });

  it("should not use the openai instrumentation if it is disabled", () => {
    const instrumentations = getInfrastackAutoInstrumentations([], {
      openai: { enabled: false, traceContent: false },
    });
    expect(instrumentations.length).toBe(
      Object.keys(Instrumentation).length - 1
    );
  });
  it("should not use the anthropic instrumentation if it is disabled", () => {
    const instrumentations = getInfrastackAutoInstrumentations([], {
      anthropic: { enabled: false, traceContent: false },
    });
    expect(instrumentations.length).toBe(
      Object.keys(Instrumentation).length - 1
    );
  });
});
