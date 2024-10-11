export type Tag = {
  key: string;
  value: string;
};
export enum Environment {
  DEV,
  DEBUG,
  PROD,
}

export const INFRASTACK_API_KEY_HEADER: string = "infrastack-api-key";
export type Configuration = {
  environment: Environment;
  tags: Tag[];
  serviceName: string;
  serviceVersion: string;
  podNamespace: string;
  podName: string;
  logsEnabled: boolean;
  endpoint: string;
  apiKey: string;
};
