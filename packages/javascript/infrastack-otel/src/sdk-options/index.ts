import { Instrumentations } from "../instrumentations";

export type llmOptions = {
  includePrompts: boolean;
};
export type tag = {
  key: string;
  value: string;
};
export enum Environment {
  DEV,
  DEBUG,
  PROD
}
export const INFRASTACK_API_KEY_HEADER : string = 'infrastack-api-key';
export type sdkOptions = {
  instrumentations: Instrumentations[];
  environment: Environment;
  tags: tag[];
  llmOptions: llmOptions;
  serviceName: string;
  serviceVersion: string;
  podNamespace: string;
  podName: string;
  environmentId: string;
  logsEnabled: boolean;
};
