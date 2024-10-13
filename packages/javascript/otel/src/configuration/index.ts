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
};
