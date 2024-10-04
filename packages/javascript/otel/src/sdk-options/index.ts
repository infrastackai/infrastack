import { Instrumentation } from "../instrumentations";

export type tag = {
  key: string;
  value: string;
};
export enum Environment {
  DEV,
  DEBUG,
  PROD,
}

export const INFRASTACK_API_KEY_HEADER: string = "infrastack-api-key";
export type sdkOptions = {
  instrumentations: Instrumentation[];
  environment: Environment;
  tags: tag[];
  serviceName: string;
  serviceVersion: string;
  podNamespace: string;
  podName: string;
  logsEnabled: boolean;
};
