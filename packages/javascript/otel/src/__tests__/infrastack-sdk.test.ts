// Adjust import path as needed
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import sinon from "sinon";
import { InfrastackSDK } from "../sdk";
import { Environment } from "../sdk-options";

describe("InfrastackSDK", () => {
  let sdk: InfrastackSDK;

  beforeEach(() => {
    sdk = new InfrastackSDK();
  });

  afterEach(() => {
    sinon.restore();
    delete process.env["INFRASTACK_TAGS"];
    delete process.env["OTEL_SERVICE_NAME"];
    delete process.env["INFRASTACK_ENVIRONMENT"];
    delete process.env["OTEL_EXPORTER_OTLP_HEADERS"];
    delete process.env["OTEL_INSTRUMENTATIONS"];
  });

  it("should initialize SDK with default options", () => {
    const startSpy = sinon.spy(InfrastackSDK.prototype, "init");
    sdk.init();
    expect(startSpy.calledOnce).toBe(true);
  });

  it("should log the correct warnings for development environment", () => {
    const consoleWarnStub = sinon.stub(console, "warn");
    sdk = new InfrastackSDK({ environment: Environment.DEV });
    sdk.init();
    expect(consoleWarnStub.calledWithMatch(/Environment is set to DEV/)).toBe(
      true
    );
  });

  it("should merge options with environment variables correctly", () => {
    process.env["OTEL_SERVICE_NAME"] = "test-service";
    process.env["INFRASTACK_ENVIRONMENT"] = "PROD";
    sdk = new InfrastackSDK({});
    expect(sdk["options"].serviceName).toBe("test-service");
    expect(sdk["options"].environment).toBe(Environment.PROD);
  });

  it("should handle parsing error for INFRASTACK_TAGS", () => {
    process.env["INFRASTACK_TAGS"] = "invalid-json";
    expect(() => {
      sdk = new InfrastackSDK({});
    }).toThrow("Failed to parse INFRASTACK_TAGS environment variable");
  });

  it("should handle correct instrumentations from options", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({
      instrumentations: ["EXPRESS", "HTTP"] as any,
      logsEnabled: true,
    });
    sdk.init();
    expect(
      consoleInfoStub.calledWithMatch(/Handling the desired instrumentations/)
    ).toBe(true);
  });

  it("should fallback to default OTEL instrumentations if none are provided", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({});
    sdk.init();
    expect(
      consoleInfoStub.calledWithMatch(
        /Sticking with the automatic instrumentations/
      )
    ).toBe(true);
  });

  it("should handleResource correctly with provided options", () => {
    sdk = new InfrastackSDK({
      serviceName: "test-service",
      serviceVersion: "1.0.0",
      podNamespace: "test-namespace",
      podName: "test-pod",
      tags: [{ key: "env", value: "test" }],
    });

    const resource = sdk["handleResource"]();
    expect(resource.attributes["service.name"]).toBe("test-service");
    expect(resource.attributes["service.version"]).toBe("1.0.0");
    expect(resource.attributes["k8s.namespace.name"]).toBe("test-namespace");
    expect(resource.attributes["k8s.pod.name"]).toBe("test-pod");
    expect(resource.attributes["env"]).toBe("test");
  });

  it("should log API key correctly if OTEL_EXPORTER_OTLP_HEADERS is set", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    process.env["OTEL_EXPORTER_OTLP_HEADERS"] = "x-api-key=mysecretapikey";
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({});
    sdk.init();
    expect(
      consoleInfoStub.calledWithMatch(/🔑 Gotcha! Found an API Key:/)
    ).toBe(true);
  });

  it("should create SimpleSpanProcessor for DEV environment", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    sdk = new InfrastackSDK({ environment: Environment.DEV });
    const handleSpanProcessorsSpy = sinon.spy(
      sdk as any,
      "handleSpanProcessors"
    );
    sdk.init();
    expect(handleSpanProcessorsSpy.calledOnce).toBe(true);

    const processors = sdk["handleSpanProcessors"](new OTLPTraceExporter());
    expect(processors.length).toBe(1);
    expect(processors[0]).toBeInstanceOf(SimpleSpanProcessor);
  });

  it("should create both ConsoleSpanProcessor and SimpleSpanProcessor for DEBUG environment", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    sdk = new InfrastackSDK({ environment: Environment.DEBUG });
    const processors = sdk["handleSpanProcessors"](new OTLPTraceExporter());
    expect(processors.length).toBe(2);
    expect(processors[0]).toBeInstanceOf(SimpleSpanProcessor);
    expect(processors[1]).toBeInstanceOf(SimpleSpanProcessor);
  });

  it("should create BatchSpanProcessor for PROD environment", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    sdk = new InfrastackSDK({ environment: Environment.PROD });
    const processors = sdk["handleSpanProcessors"](new OTLPTraceExporter());
    expect(processors.length).toBe(1);
    expect(processors[0]).toBeInstanceOf(BatchSpanProcessor);
  });

  it("should throw an error if OTEL_INSTRUMENTATIONS environment variable is invalid", () => {
    process.env["OTEL_INSTRUMENTATIONS"] = "invalid-json";
    expect(() => {
      sdk = new InfrastackSDK({});
    }).toThrow("Failed to parse OTEL_INSTRUMENTATIONS environment variable");
  });

  it("should warn if unrecognized instrumentation is provided", () => {
    process.env["OTEL_INSTRUMENTATIONS"] = JSON.stringify([
      "UNSUPPORTED_INSTRUMENT",
    ]);
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    const consoleWarnStub = sinon.stub(console, "warn");
    sdk = new InfrastackSDK({});
    sdk.init();
    expect(
      consoleWarnStub.calledWithMatch(
        /Instrumentation UNSUPPORTED_INSTRUMENT is not recognized/
      )
    ).toBe(true);
  });

  it("should handle logging when logs are enabled", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({ logsEnabled: true });
    sdk.init();
    expect(consoleInfoStub.calledWithMatch(/🧙 Doing some magic/)).toBe(true);
    expect(
      consoleInfoStub.calledWithMatch(
        /🚀 Application is now instrumented with OpenTelemetry/
      )
    ).toBe(true);
  });

  it("should not log if logsEnabled is false", () => {
    process.env["INFRASTACK_TAGS"] = JSON.stringify([
      { key: "env", value: "test" },
    ]);
    const consoleInfoStub = sinon.stub(console, "info");
    sdk = new InfrastackSDK({ logsEnabled: false });
    sdk.init();
    expect(consoleInfoStub.notCalled).toBe(true);
  });
});
