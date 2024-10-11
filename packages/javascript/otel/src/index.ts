import { Configuration } from "./configuration";
import { InfrastackSDK } from "./sdk";

export function startOtel(configuration?: Partial<Configuration>) {
  if (
    (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== "nodejs") ||
    typeof window !== "undefined"
  ) {
    return;
  }
  const sdk = new InfrastackSDK(configuration ?? {});
  sdk.init();
}

export { Configuration, Environment } from "./configuration";
export type { Tag } from "./configuration";
