import { LnRpcClientConfig } from "./config";
import { LnRpc } from "./lnrpc";
import { Duplex, Readable } from "./streams";

declare module "@radar/lnrpc" {
  export * from "./config";
  export * from "./lnrpc";
  export * from "./streams";

  function createLnRpc(config: LnRpcClientConfig): Promise<LnRpc>;
  export = createLnRpc;
}
