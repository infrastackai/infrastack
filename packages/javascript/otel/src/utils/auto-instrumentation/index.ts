import { AmqplibInstrumentation } from "@opentelemetry/instrumentation-amqplib";
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";
import { BunyanInstrumentation } from "@opentelemetry/instrumentation-bunyan";
import { CassandraDriverInstrumentation } from "@opentelemetry/instrumentation-cassandra-driver";
import { ConnectInstrumentation } from "@opentelemetry/instrumentation-connect";
import { CucumberInstrumentation } from "@opentelemetry/instrumentation-cucumber";
import { DataloaderInstrumentation } from "@opentelemetry/instrumentation-dataloader";
import { DnsInstrumentation } from "@opentelemetry/instrumentation-dns";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { FastifyInstrumentation } from "@opentelemetry/instrumentation-fastify";
import { GenericPoolInstrumentation } from "@opentelemetry/instrumentation-generic-pool";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { HapiInstrumentation } from "@opentelemetry/instrumentation-hapi";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { IORedisInstrumentation } from "@opentelemetry/instrumentation-ioredis";
import { KafkaJsInstrumentation } from "@opentelemetry/instrumentation-kafkajs";
import { KnexInstrumentation } from "@opentelemetry/instrumentation-knex";
import { KoaInstrumentation } from "@opentelemetry/instrumentation-koa";
import { LruMemoizerInstrumentation } from "@opentelemetry/instrumentation-lru-memoizer";
import { MemcachedInstrumentation } from "@opentelemetry/instrumentation-memcached";
import { MongoDBInstrumentation } from "@opentelemetry/instrumentation-mongodb";
import { MongooseInstrumentation } from "@opentelemetry/instrumentation-mongoose";
import { MySQLInstrumentation } from "@opentelemetry/instrumentation-mysql";
import { MySQL2Instrumentation } from "@opentelemetry/instrumentation-mysql2";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { RedisInstrumentation as RedisInstrumentationV2 } from "@opentelemetry/instrumentation-redis";
import { RedisInstrumentation as RedisInstrumentationV4 } from "@opentelemetry/instrumentation-redis-4";
import { RestifyInstrumentation } from "@opentelemetry/instrumentation-restify";
import { RouterInstrumentation } from "@opentelemetry/instrumentation-router";
import { SocketIoInstrumentation } from "@opentelemetry/instrumentation-socket.io";
import { TediousInstrumentation } from "@opentelemetry/instrumentation-tedious";
import { AnthropicInstrumentation } from "@traceloop/instrumentation-anthropic";
import { OpenAIInstrumentation } from "@traceloop/instrumentation-openai";
import { Instrumentation, LLMOptions } from "../../configuration";

const instrumentationMap = {
  //OpenTelemetry Instrumentations
  [Instrumentation.AMQPLIB]: AmqplibInstrumentation,
  [Instrumentation.AWS_SDK]: AwsInstrumentation,
  [Instrumentation.BUNYAN]: BunyanInstrumentation,
  [Instrumentation.CASSANDRA_DRIVER]: CassandraDriverInstrumentation,
  [Instrumentation.CONNECT]: ConnectInstrumentation,
  [Instrumentation.CUCUMBER]: CucumberInstrumentation,
  [Instrumentation.DATALOADER]: DataloaderInstrumentation,
  [Instrumentation.DNS]: DnsInstrumentation,
  [Instrumentation.EXPRESS]: ExpressInstrumentation,
  [Instrumentation.FASTIFY]: FastifyInstrumentation,
  [Instrumentation.GENERIC_POOL]: GenericPoolInstrumentation,
  [Instrumentation.GRAPHQL]: GraphQLInstrumentation,
  [Instrumentation.HAPI]: HapiInstrumentation,
  [Instrumentation.HTTP]: HttpInstrumentation,
  [Instrumentation.IOREDIS]: IORedisInstrumentation,
  [Instrumentation.KAFKAJS]: KafkaJsInstrumentation,
  [Instrumentation.KNEX]: KnexInstrumentation,
  [Instrumentation.KOA]: KoaInstrumentation,
  [Instrumentation.LRU_MEMOIZER]: LruMemoizerInstrumentation,
  [Instrumentation.MEMCACHED]: MemcachedInstrumentation,
  [Instrumentation.MONGODB]: MongoDBInstrumentation,
  [Instrumentation.MONGOOSE]: MongooseInstrumentation,
  [Instrumentation.MYSQL2]: MySQL2Instrumentation,
  [Instrumentation.MYSQL]: MySQLInstrumentation,
  [Instrumentation.NESTJS_CORE]: NestInstrumentation,
  [Instrumentation.PG]: PgInstrumentation,
  [Instrumentation.REDIS]: RedisInstrumentationV2,
  [Instrumentation.REDIS_4]: RedisInstrumentationV4,
  [Instrumentation.RESTIFY]: RestifyInstrumentation,
  [Instrumentation.ROUTER]: RouterInstrumentation,
  [Instrumentation.SOCKET_IO]: SocketIoInstrumentation,
  [Instrumentation.TEDIOUS]: TediousInstrumentation,
  //External Instrumentations
  [Instrumentation.OPENAI]: OpenAIInstrumentation,
  [Instrumentation.ANTHROPIC]: AnthropicInstrumentation,
};

export function getInfrastackAutoInstrumentations(
  disabledInstrumentations: Instrumentation[],
  llmOptions?: Partial<LLMOptions>
) {
  const defaultLLMOptions: LLMOptions = {
    openai: { enabled: true, traceContent: true },
    anthropic: { enabled: true, traceContent: true },
  };

  const mergedLLMOptions: LLMOptions = {
    openai: { ...defaultLLMOptions.openai, ...llmOptions?.openai },
    anthropic: { ...defaultLLMOptions.anthropic, ...llmOptions?.anthropic },
  };

  const instrumentations = [];
  for (const [name, Instance] of Object.entries(instrumentationMap)) {
    if (!disabledInstrumentations.includes(name as Instrumentation)) {
      let initiatedInstance;
      switch (name) {
        case Instrumentation.HTTP:
          initiatedInstance = new Instance({
            ignoreOutgoingRequestHook: (req) => {
              return req.path?.includes("v1/traces") ?? false; // to avoid infinite recursion of tracing calls
            },
          });
          break;
        case Instrumentation.OPENAI:
          if (mergedLLMOptions.openai?.enabled) {
            initiatedInstance = new Instance({
              traceContent: mergedLLMOptions.openai.traceContent,
            });
          }
          break;
        case Instrumentation.ANTHROPIC:
          if (mergedLLMOptions.anthropic?.enabled) {
            initiatedInstance = new Instance({
              traceContent: mergedLLMOptions.anthropic.traceContent,
            });
          }
          break;
        default:
          initiatedInstance = new Instance();
      }
      if (initiatedInstance) {
        instrumentations.push(initiatedInstance);
      }
    }
  }
  return instrumentations;
}
