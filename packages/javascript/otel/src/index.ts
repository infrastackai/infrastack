import { Configuration } from "./configuration";
import { InfrastackSDK } from "./sdk";

/**
 * @deprecated Use Infrastack.init() instead.
 */
export function startOtel(configuration?: Partial<Configuration>) {
  const sdk = new InfrastackSDK(configuration ?? {});
  sdk.init();
}


export { Configuration, Instrumentation, Protocol } from "./configuration";
export type { Tag } from "./configuration";

export class Infrastack {
  private static sdk: InfrastackSDK;

  static init(configuration?: Partial<Configuration>) {
    this.sdk = new InfrastackSDK(configuration ?? {});
    this.sdk.init();
  }
}
