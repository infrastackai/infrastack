import { Instrumentations } from "../instrumentations";
import {
  INFRASTACK_ENVIRONMENT,
  INFRASTACK_ENVIRONMENT_ID,
  INFRASTACK_INSTRUMENTATIONS,
  INFRASTACK_LLM_INCLUDE_PROMPTS,
  INFRASTACK_LOGS_ENABLED,
  INFRASTACK_POD_NAME,
  INFRASTACK_POD_NAMESPACE,
  INFRASTACK_SERVICE_NAME,
  INFRASTACK_SERVICE_VERSION,
  INFRASTACK_TAGS,
  OTEL_EXPORTER_OTLP_ENDPOINT,
  OTEL_EXPORTER_OTLP_HEADERS,
} from "../environment";
import {
  Environment,
  INFRASTACK_API_KEY_HEADER,
  llmOptions,
  sdkOptions,
  tag,
} from "../sdk-options";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { Resource } from "@opentelemetry/resources";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
  SimpleSpanProcessor,
  BatchSpanProcessor,
  ConsoleSpanExporter,
  InMemorySpanExporter,
} from "@opentelemetry/sdk-trace-base";

const ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
const ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
const ATTR_K8S_POD_NAME = "k8s.pod.name";
const ATTR_INFRASTACK_ENVIRONMENT_ID = "environment.id";

export class InfrastackSDK {
  private options: sdkOptions;

  constructor(options?: Partial<sdkOptions>) {
    this.options = this.mergeOptionsWithEnvVars(options);
  }

  init() {
    this.performInitialLogging();
    const exporterOptions = {
      compression: CompressionAlgorithm.GZIP,
    };
    const traceExporter = new OTLPTraceExporter(exporterOptions);
    const resource: Resource = this.handleResource();

    let otelInsturmentations: any[] = this.handleInstrumentations();

    const spanProcessors: any[] = this.handleSpanProcessors(traceExporter);

    const otelSDK = new NodeSDK({
      traceExporter,
      resource: resource,
      instrumentations: otelInsturmentations,
      spanProcessors: spanProcessors,
    });
    otelSDK.start();
    if (this.options.logsEnabled) {
      console.info(
        "🚀 Application is now instrumented with OpenTelemetry 🤝 infrastack.ai and ready to go! 💪"
      );
    }
  }

  private mergeOptionsWithEnvVars(
    providedOptions?: Partial<sdkOptions>
  ): sdkOptions {
    const envTags: string | undefined = process.env[INFRASTACK_TAGS];
    const envInstrumentations: string | undefined =
      process.env[INFRASTACK_INSTRUMENTATIONS];
    const envEnvironment: string = process.env[INFRASTACK_ENVIRONMENT] ?? "";
    const environment: Environment =
      envEnvironment === "PROD"
        ? Environment.PROD
        : envEnvironment === "DEBUG"
        ? Environment.DEBUG
        : Environment.DEV;

    const llmOptions: llmOptions = {
      includePrompts: process.env[INFRASTACK_LLM_INCLUDE_PROMPTS] === "true",
    };

    const serviceName: string = process.env[INFRASTACK_SERVICE_NAME] ?? "";
    const serviceVersion: string =
      process.env[INFRASTACK_SERVICE_VERSION] ?? "0.0.1";
    const podNamespace: string = process.env[INFRASTACK_POD_NAMESPACE] ?? "";
    const podName: string = process.env[INFRASTACK_POD_NAME] ?? "";
    const environmentId: string = process.env[INFRASTACK_ENVIRONMENT_ID] ?? "";
    const logsEnabled: boolean = process.env[INFRASTACK_LOGS_ENABLED]
      ? process.env[INFRASTACK_LOGS_ENABLED] === "false"
        ? false
        : true
      : true;
    let tags: tag[] = [];
    if (envTags) {
      try {
        tags = JSON.parse(envTags);
      } catch (e) {
        throw new Error("Failed to parse INFRASTACK_TAGS environment variable");
      }
    }

    let instrumentations: Instrumentations[] = [];
    if (envInstrumentations) {
      try {
        instrumentations = JSON.parse(envInstrumentations);
      } catch (e) {
        throw new Error(
          "Failed to parse INFRASTACK_INSTRUMENTATIONS environment variable"
        );
      }
    }

    return {
      environment: providedOptions?.environment || environment,
      tags: providedOptions?.tags || tags,
      instrumentations: providedOptions?.instrumentations || instrumentations,
      llmOptions: providedOptions?.llmOptions || llmOptions,
      serviceName: providedOptions?.serviceName || serviceName,
      serviceVersion: providedOptions?.serviceVersion || serviceVersion,
      podNamespace: providedOptions?.podNamespace || podNamespace,
      podName: providedOptions?.podName || podName,
      environmentId: providedOptions?.environmentId || environmentId,
      logsEnabled: providedOptions?.logsEnabled || logsEnabled,
    };
  }

  private performInitialLogging() {
    if (this.options.environment === Environment.DEV) {
      console.warn(
        "⚠️ Environment is set to DEV. Make sure not to deploy this to production."
      );
    }
    if (this.options.logsEnabled) {
      console.info(
        "🧙 Doing some magic to get this application started with infrastack.ai..."
      );

      if (process.env[OTEL_EXPORTER_OTLP_ENDPOINT]) {
        console.info(
          "🌐 Exporter endpoint is set as:",
          process.env[OTEL_EXPORTER_OTLP_ENDPOINT]
        );
      }

      if (process.env[OTEL_EXPORTER_OTLP_HEADERS]) {
        const apiKey =
          process.env[OTEL_EXPORTER_OTLP_HEADERS].split("=")[1] ?? "";
        const obfuscatedKey = `${apiKey.slice(
          0,
          4
        )}*************************${apiKey.slice(-4)}`;

        console.info("🔑 Gotcha! Found an API Key:", obfuscatedKey);
      }
    }
  }
  private handleResource(): Resource {
    const resourceAttributes: { [key: string]: string } = {
      [ATTR_SERVICE_NAME]: this.options.serviceName,
      [ATTR_SERVICE_VERSION]: this.options.serviceVersion,
      [ATTR_SERVICE_INSTANCE_ID]: this.options.podName,
      [ATTR_K8S_NAMESPACE_NAME]: this.options.podNamespace,
      [ATTR_K8S_POD_NAME]: this.options.podName,
      [ATTR_INFRASTACK_ENVIRONMENT_ID]: this.options.environmentId,
    };
  
    if (this.options.tags && this.options.tags.length !== 0) {
      this.options.tags.forEach((tag) => {
        resourceAttributes[tag.key] = tag.value;
      });
    }
  

    const resource: Resource = new Resource(resourceAttributes);
    return resource;
  }
  private handleInstrumentations(): any[] {
    let otelInsturmentations: any[] = [];
    if (this.options.instrumentations.length !== 0) {
      if (this.options.logsEnabled) {
        console.info(
          "🎻 Handling the desired instrumentations...",
          this.options.instrumentations
        );
      }
      this.options.instrumentations.forEach(async (instrumentation) => {
        switch (instrumentation) {
          case Instrumentations.AMQP:
            const {
              AmqplibInstrumentation,
            } = require("@opentelemetry/instrumentation-amqplib");
            otelInsturmentations.push(new AmqplibInstrumentation());
            break;

          case Instrumentations.AWS_LAMBDA:
            const {
              AwsLambdaInstrumentation,
            } = require("@opentelemetry/instrumentation-aws-lambda");
            otelInsturmentations.push(new AwsLambdaInstrumentation());
            break;

          case Instrumentations.AWS_SDK:
            const {
              AwsInstrumentation,
            } = require("@opentelemetry/instrumentation-aws-sdk");
            otelInsturmentations.push(new AwsInstrumentation());
            break;

          case Instrumentations.BUNYAN:
            const {
              BunyanInstrumentation,
            } = require("@opentelemetry/instrumentation-bunyan");
            otelInsturmentations.push(new BunyanInstrumentation());
            break;

          case Instrumentations.CASSANDRA_DRIVER:
            const {
              CassandraDriverInstrumentation,
            } = require("@opentelemetry/instrumentation-cassandra-driver");
            otelInsturmentations.push(new CassandraDriverInstrumentation());
            break;

          case Instrumentations.CONNECT:
            const {
              ConnectInstrumentation,
            } = require("@opentelemetry/instrumentation-connect");
            otelInsturmentations.push(new ConnectInstrumentation());
            break;

          case Instrumentations.CUCUMBER:
            const {
              CucumberInstrumentation,
            } = require("@opentelemetry/instrumentation-cucumber");
            otelInsturmentations.push(new CucumberInstrumentation());
            break;

          case Instrumentations.DATALOADER:
            const {
              DataloaderInstrumentation,
            } = require("@opentelemetry/instrumentation-dataloader");
            otelInsturmentations.push(new DataloaderInstrumentation());
            break;

          case Instrumentations.DNS:
            const {
              DnsInstrumentation,
            } = require("@opentelemetry/instrumentation-dns");
            otelInsturmentations.push(new DnsInstrumentation());
            break;

          case Instrumentations.EXPRESS:
            const {
              ExpressInstrumentation,
            } = require("@opentelemetry/instrumentation-express");
            otelInsturmentations.push(new ExpressInstrumentation());
            break;

          case Instrumentations.FASTIFY:
            const {
              FastifyInstrumentation,
            } = require("@opentelemetry/instrumentation-fastify");
            otelInsturmentations.push(new FastifyInstrumentation());
            break;

          case Instrumentations.GENERIC_POOL:
            const {
              GenericPoolInstrumentation,
            } = require("@opentelemetry/instrumentation-generic-pool");
            otelInsturmentations.push(new GenericPoolInstrumentation());
            break;

          case Instrumentations.GRAPHQL:
            const {
              GraphQLInstrumentation,
            } = require("@opentelemetry/instrumentation-graphql");
            otelInsturmentations.push(new GraphQLInstrumentation());
            break;

          case Instrumentations.GRPC:
            const {
              GrpcInstrumentation,
            } = require("@opentelemetry/instrumentation-grpc");
            otelInsturmentations.push(new GrpcInstrumentation());
            break;

          case Instrumentations.HAPI:
            const {
              HapiInstrumentation,
            } = require("@opentelemetry/instrumentation-hapi");
            otelInsturmentations.push(new HapiInstrumentation());
            break;

          case Instrumentations.HTTP:
            const {
              HttpInstrumentation,
            } = require("@opentelemetry/instrumentation-http");
            otelInsturmentations.push(new HttpInstrumentation());
            break;

          case Instrumentations.IOREDIS:
            const {
              IORedisInstrumentation,
            } = require("@opentelemetry/instrumentation-ioredis");
            otelInsturmentations.push(new IORedisInstrumentation());
            break;

          case Instrumentations.KAFKAJS:
            const {
              KafkaJsInstrumentation,
            } = require("@opentelemetry/instrumentation-kafkajs");
            otelInsturmentations.push(new KafkaJsInstrumentation());
            break;

          case Instrumentations.KNEX:
            const {
              KnexInstrumentation,
            } = require("@opentelemetry/instrumentation-knex");
            otelInsturmentations.push(new KnexInstrumentation());
            break;

          case Instrumentations.KOA:
            const {
              KoaInstrumentation,
            } = require("@opentelemetry/instrumentation-koa");
            otelInsturmentations.push(new KoaInstrumentation());
            break;

          case Instrumentations.LRU_MEMOIZER:
            const {
              LruMemoizerInstrumentation,
            } = require("@opentelemetry/instrumentation-lru-memoizer");
            otelInsturmentations.push(new LruMemoizerInstrumentation());
            break;

          case Instrumentations.MEMCACHED:
            const {
              MemcachedInstrumentation,
            } = require("@opentelemetry/instrumentation-memcached");
            otelInsturmentations.push(new MemcachedInstrumentation());
            break;

          case Instrumentations.MONGODB:
            const {
              MongoDBInstrumentation,
            } = require("@opentelemetry/instrumentation-mongodb");
            otelInsturmentations.push(new MongoDBInstrumentation());
            break;

          case Instrumentations.MONGOOSE:
            const {
              MongooseInstrumentation,
            } = require("@opentelemetry/instrumentation-mongoose");
            otelInsturmentations.push(new MongooseInstrumentation());
            break;

          case Instrumentations.MYSQL:
            const {
              MySQLInstrumentation,
            } = require("@opentelemetry/instrumentation-mysql");
            otelInsturmentations.push(new MySQLInstrumentation());
            break;

          case Instrumentations.MYSQL2:
            const {
              MySQL2Instrumentation,
            } = require("@opentelemetry/instrumentation-mysql2");
            otelInsturmentations.push(new MySQL2Instrumentation());
            break;

          case Instrumentations.NESTJS_CORE:
            const {
              NestInstrumentation,
            } = require("@opentelemetry/instrumentation-nestjs-core");
            otelInsturmentations.push(new NestInstrumentation());
            break;

          case Instrumentations.NET:
            const {
              NetInstrumentation,
            } = require("@opentelemetry/instrumentation-net");
            otelInsturmentations.push(new NetInstrumentation());
            break;

          case Instrumentations.PG:
            const {
              PgInstrumentation,
            } = require("@opentelemetry/instrumentation-pg");
            otelInsturmentations.push(new PgInstrumentation());
            break;

          case Instrumentations.PINO:
            const {
              PinoInstrumentation,
            } = require("@opentelemetry/instrumentation-pino");
            otelInsturmentations.push(new PinoInstrumentation());
            break;

          case Instrumentations.REDIS:
            const {
              RedisInstrumentation,
            } = require("@opentelemetry/instrumentation-redis");
            otelInsturmentations.push(new RedisInstrumentation());
            break;

          case Instrumentations.RESTIFY:
            const {
              RestifyInstrumentation,
            } = require("@opentelemetry/instrumentation-restify");
            otelInsturmentations.push(new RestifyInstrumentation());
            break;

          case Instrumentations.SOCKETIO:
            const {
              SocketIoInstrumentation,
            } = require("@opentelemetry/instrumentation-socket.io");
            otelInsturmentations.push(new SocketIoInstrumentation());
            break;

          case Instrumentations.UNDICI:
            const {
              UndiciInstrumentation,
            } = require("@opentelemetry/instrumentation-undici");
            otelInsturmentations.push(new UndiciInstrumentation());
            break;

          case Instrumentations.WINSTON:
            const {
              WinstonInstrumentation,
            } = require("@opentelemetry/instrumentation-winston");
            otelInsturmentations.push(new WinstonInstrumentation());
            break;

          default:
            console.warn(
              `Instrumentation ${instrumentation} is not implemented.`
            );
            break;
        }
        const {
          FsInstrumentation,
        } = require("@opentelemetry/instrumentation-fs");
        otelInsturmentations.push(
          new FsInstrumentation({ requireParentSpan: true })
        );
      });
    } else {
      if (this.options.logsEnabled) {
        console.info("🎻🤖 Sticking with the automatic instrumentations..");
      }

      otelInsturmentations = getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-fs": {
          requireParentSpan: true,
        },
      });
    }
    if (this.options.logsEnabled) {
      console.info("⌛ Almost there...");
    }
    return otelInsturmentations;
  }

  private handleSpanProcessors(traceExporter: any): any[] {
    const spanProcessors: any[] = [];
    if (this.options.environment === Environment.DEBUG) {
      spanProcessors.push(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    } else if (this.options.environment === Environment.DEV) {
      spanProcessors.push(new SimpleSpanProcessor(new InMemorySpanExporter()));
    } else {
      spanProcessors.push(new BatchSpanProcessor(traceExporter));
    }
    return spanProcessors;
  }
}
