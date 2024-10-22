export type Tag = {
  key: string;
  value: string;
};

export const INFRASTACK_API_KEY_HEADER: string = "infrastack-api-key";
export type Configuration = {
  isDevelopmentMode: boolean;
  tags: Tag[];
  serviceName: string;
  serviceVersion: string;
  podNamespace: string;
  podName: string;
  logsEnabled: boolean;
  endpoint: string;
  apiKey: string;
  disabledInstrumentations: Instrumentation[];
  protocol: Protocol;
  llmOptions?: Partial<LLMOptions>;
};
export type LLMOptionsBase = {
  enabled?: boolean;
  traceContent?: boolean;
};

export type LLMOptions = {
  openai?: LLMOptionsBase;
  anthropic?: LLMOptionsBase;
};

export enum Protocol {
  HTTP = "http",
  GRPC = "grpc",
}
export enum Instrumentation {
  //OpenTelemetry Instrumentations
  AMQPLIB = "amqplib",
  AWS_SDK = "aws-sdk",
  BUNYAN = "bunyan",
  CASSANDRA_DRIVER = "cassandra-driver",
  CONNECT = "connect",
  CUCUMBER = "cucumber",
  DATALOADER = "dataloader",
  DNS = "dns",
  EXPRESS = "express",
  FASTIFY = "fastify",
  GENERIC_POOL = "generic-pool",
  GRAPHQL = "graphql",
  HAPI = "hapi",
  HTTP = "http",
  IOREDIS = "ioredis",
  KAFKAJS = "kafkajs",
  KNEX = "knex",
  KOA = "koa",
  LRU_MEMOIZER = "lru-memoizer",
  MEMCACHED = "memcached",
  MONGODB = "mongodb",
  MONGOOSE = "mongoose",
  MYSQL2 = "mysql2",
  MYSQL = "mysql",
  NESTJS_CORE = "nestjs-core",
  PG = "pg",
  REDIS = "redis",
  REDIS_4 = "redis-4",
  RESTIFY = "restify",
  ROUTER = "router",
  SOCKET_IO = "socket.io",
  TEDIOUS = "tedious",
  //External Instrumentations
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
}
