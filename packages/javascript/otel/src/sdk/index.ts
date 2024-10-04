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
import {
  INFRASTACK_ENVIRONMENT,
  INFRASTACK_LOGS_ENABLED,
  INFRASTACK_TAGS,
  OTEL_EXPORTER_OTLP_ENDPOINT,
  OTEL_EXPORTER_OTLP_HEADERS,
  OTEL_INSTRUMENTATIONS,
  OTEL_K8S_NAMESPACE,
  OTEL_K8S_POD_NAME,
  OTEL_SERVICE_NAME,
  OTEL_SERVICE_VERSION,
} from "../environment";
import { Instrumentation } from "../instrumentations";
import { Environment, sdkOptions, tag } from "../sdk-options";

const ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
const ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
const ATTR_K8S_POD_NAME = "k8s.pod.name";

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
      process.env[OTEL_INSTRUMENTATIONS];
    const envEnvironment: string = process.env[INFRASTACK_ENVIRONMENT] ?? "";
    const environment: Environment =
      providedOptions?.environment ??
      (envEnvironment === "PROD"
        ? Environment.PROD
        : envEnvironment === "DEBUG"
        ? Environment.DEBUG
        : Environment.DEV);

    const serviceName: string =
      providedOptions?.serviceName ?? process.env[OTEL_SERVICE_NAME] ?? "";
    const serviceVersion: string =
      providedOptions?.serviceVersion ??
      process.env[OTEL_SERVICE_VERSION] ??
      "0.0.1";
    const podNamespace: string =
      providedOptions?.podNamespace ?? process.env[OTEL_K8S_NAMESPACE] ?? "";
    const podName: string =
      providedOptions?.podName ?? process.env[OTEL_K8S_POD_NAME] ?? "";
    const logsEnabled: boolean =
      providedOptions?.logsEnabled ??
      (process.env[INFRASTACK_LOGS_ENABLED]
        ? process.env[INFRASTACK_LOGS_ENABLED] !== "false"
        : true);

    let tags: tag[] = providedOptions?.tags || [];
    if (!tags.length && envTags) {
      try {
        tags = JSON.parse(envTags);
      } catch (e) {
        throw new Error("Failed to parse INFRASTACK_TAGS environment variable");
      }
    }

    let instrumentations: Instrumentation[] =
      providedOptions?.instrumentations || [];
    if (!instrumentations.length && envInstrumentations) {
      try {
        const parsedInstrumentations: string[] =
          JSON.parse(envInstrumentations);

        instrumentations = parsedInstrumentations
          .map((instr: string) => {
            if (
              Instrumentation[
                instr.toUpperCase() as keyof typeof Instrumentation
              ]
            ) {
              return Instrumentation[
                instr.toUpperCase() as keyof typeof Instrumentation
              ];
            } else {
              console.warn(`Instrumentation ${instr} is not recognized.`);
              return null;
            }
          })
          .filter((instr): instr is Instrumentation => instr !== null);
      } catch (e) {
        throw new Error(
          "Failed to parse OTEL_INSTRUMENTATIONS environment variable"
        );
      }
    }

    return {
      environment,
      tags,
      instrumentations,
      serviceName,
      serviceVersion,
      podNamespace,
      podName,
      logsEnabled,
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
          this.options.instrumentations.map(
            (instr: Instrumentation) => Instrumentation[instr]
          )
        );
      }
      this.options.instrumentations.forEach(async (instrumentation) => {
        switch (instrumentation) {
          case Instrumentation.AMQP:
            const {
              AmqplibInstrumentation,
            } = require("@opentelemetry/instrumentation-amqplib");
            otelInsturmentations.push(new AmqplibInstrumentation());
            break;

          case Instrumentation.AWS_LAMBDA:
            const {
              AwsLambdaInstrumentation,
            } = require("@opentelemetry/instrumentation-aws-lambda");
            otelInsturmentations.push(new AwsLambdaInstrumentation());
            break;

          case Instrumentation.AWS_SDK:
            const {
              AwsInstrumentation,
            } = require("@opentelemetry/instrumentation-aws-sdk");
            otelInsturmentations.push(new AwsInstrumentation());
            break;

          case Instrumentation.BUNYAN:
            const {
              BunyanInstrumentation,
            } = require("@opentelemetry/instrumentation-bunyan");
            otelInsturmentations.push(new BunyanInstrumentation());
            break;

          case Instrumentation.CASSANDRA_DRIVER:
            const {
              CassandraDriverInstrumentation,
            } = require("@opentelemetry/instrumentation-cassandra-driver");
            otelInsturmentations.push(new CassandraDriverInstrumentation());
            break;

          case Instrumentation.CONNECT:
            const {
              ConnectInstrumentation,
            } = require("@opentelemetry/instrumentation-connect");
            otelInsturmentations.push(new ConnectInstrumentation());
            break;

          case Instrumentation.CUCUMBER:
            const {
              CucumberInstrumentation,
            } = require("@opentelemetry/instrumentation-cucumber");
            otelInsturmentations.push(new CucumberInstrumentation());
            break;

          case Instrumentation.DATALOADER:
            const {
              DataloaderInstrumentation,
            } = require("@opentelemetry/instrumentation-dataloader");
            otelInsturmentations.push(new DataloaderInstrumentation());
            break;

          case Instrumentation.DNS:
            const {
              DnsInstrumentation,
            } = require("@opentelemetry/instrumentation-dns");
            otelInsturmentations.push(new DnsInstrumentation());
            break;

          case Instrumentation.EXPRESS:
            const {
              ExpressInstrumentation,
            } = require("@opentelemetry/instrumentation-express");
            otelInsturmentations.push(new ExpressInstrumentation());
            break;

          case Instrumentation.FASTIFY:
            const {
              FastifyInstrumentation,
            } = require("@opentelemetry/instrumentation-fastify");
            otelInsturmentations.push(new FastifyInstrumentation());
            break;

          case Instrumentation.GENERIC_POOL:
            const {
              GenericPoolInstrumentation,
            } = require("@opentelemetry/instrumentation-generic-pool");
            otelInsturmentations.push(new GenericPoolInstrumentation());
            break;

          case Instrumentation.GRAPHQL:
            const {
              GraphQLInstrumentation,
            } = require("@opentelemetry/instrumentation-graphql");
            otelInsturmentations.push(new GraphQLInstrumentation());
            break;

          case Instrumentation.GRPC:
            const {
              GrpcInstrumentation,
            } = require("@opentelemetry/instrumentation-grpc");
            otelInsturmentations.push(new GrpcInstrumentation());
            break;

          case Instrumentation.HAPI:
            const {
              HapiInstrumentation,
            } = require("@opentelemetry/instrumentation-hapi");
            otelInsturmentations.push(new HapiInstrumentation());
            break;

          case Instrumentation.HTTP:
            const {
              HttpInstrumentation,
            } = require("@opentelemetry/instrumentation-http");
            otelInsturmentations.push(new HttpInstrumentation());
            break;

          case Instrumentation.IOREDIS:
            const {
              IORedisInstrumentation,
            } = require("@opentelemetry/instrumentation-ioredis");
            otelInsturmentations.push(new IORedisInstrumentation());
            break;

          case Instrumentation.KAFKAJS:
            const {
              KafkaJsInstrumentation,
            } = require("@opentelemetry/instrumentation-kafkajs");
            otelInsturmentations.push(new KafkaJsInstrumentation());
            break;

          case Instrumentation.KNEX:
            const {
              KnexInstrumentation,
            } = require("@opentelemetry/instrumentation-knex");
            otelInsturmentations.push(new KnexInstrumentation());
            break;

          case Instrumentation.KOA:
            const {
              KoaInstrumentation,
            } = require("@opentelemetry/instrumentation-koa");
            otelInsturmentations.push(new KoaInstrumentation());
            break;

          case Instrumentation.LRU_MEMOIZER:
            const {
              LruMemoizerInstrumentation,
            } = require("@opentelemetry/instrumentation-lru-memoizer");
            otelInsturmentations.push(new LruMemoizerInstrumentation());
            break;

          case Instrumentation.MEMCACHED:
            const {
              MemcachedInstrumentation,
            } = require("@opentelemetry/instrumentation-memcached");
            otelInsturmentations.push(new MemcachedInstrumentation());
            break;

          case Instrumentation.MONGODB:
            const {
              MongoDBInstrumentation,
            } = require("@opentelemetry/instrumentation-mongodb");
            otelInsturmentations.push(new MongoDBInstrumentation());
            break;

          case Instrumentation.MONGOOSE:
            const {
              MongooseInstrumentation,
            } = require("@opentelemetry/instrumentation-mongoose");
            otelInsturmentations.push(new MongooseInstrumentation());
            break;

          case Instrumentation.MYSQL:
            const {
              MySQLInstrumentation,
            } = require("@opentelemetry/instrumentation-mysql");
            otelInsturmentations.push(new MySQLInstrumentation());
            break;

          case Instrumentation.MYSQL2:
            const {
              MySQL2Instrumentation,
            } = require("@opentelemetry/instrumentation-mysql2");
            otelInsturmentations.push(new MySQL2Instrumentation());
            break;

          case Instrumentation.NESTJS_CORE:
            const {
              NestInstrumentation,
            } = require("@opentelemetry/instrumentation-nestjs-core");
            otelInsturmentations.push(new NestInstrumentation());
            break;

          case Instrumentation.NET:
            const {
              NetInstrumentation,
            } = require("@opentelemetry/instrumentation-net");
            otelInsturmentations.push(new NetInstrumentation());
            break;

          case Instrumentation.PG:
            const {
              PgInstrumentation,
            } = require("@opentelemetry/instrumentation-pg");
            otelInsturmentations.push(new PgInstrumentation());
            break;

          case Instrumentation.PINO:
            const {
              PinoInstrumentation,
            } = require("@opentelemetry/instrumentation-pino");
            otelInsturmentations.push(new PinoInstrumentation());
            break;

          case Instrumentation.REDIS:
            const {
              RedisInstrumentation,
            } = require("@opentelemetry/instrumentation-redis");
            otelInsturmentations.push(new RedisInstrumentation());
            break;

          case Instrumentation.RESTIFY:
            const {
              RestifyInstrumentation,
            } = require("@opentelemetry/instrumentation-restify");
            otelInsturmentations.push(new RestifyInstrumentation());
            break;

          case Instrumentation.SOCKETIO:
            const {
              SocketIoInstrumentation,
            } = require("@opentelemetry/instrumentation-socket.io");
            otelInsturmentations.push(new SocketIoInstrumentation());
            break;

          case Instrumentation.UNDICI:
            const {
              UndiciInstrumentation,
            } = require("@opentelemetry/instrumentation-undici");
            otelInsturmentations.push(new UndiciInstrumentation());
            break;

          case Instrumentation.WINSTON:
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
      if (this.options.logsEnabled) {
        console.info("🔍 Debug mode enabled.");
        console.info(
          "👀 You will be able to see the traces in the console as well as in the dashboard."
        );
      }
      spanProcessors.push(new SimpleSpanProcessor(new ConsoleSpanExporter()));
      spanProcessors.push(new SimpleSpanProcessor(traceExporter));
    } else if (this.options.environment === Environment.DEV) {
      spanProcessors.push(new SimpleSpanProcessor(traceExporter));
    } else {
      spanProcessors.push(new BatchSpanProcessor(traceExporter));
    }
    return spanProcessors;
  }
}
