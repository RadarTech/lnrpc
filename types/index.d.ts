import { LnRpcClientConfig } from "./config";
import { LnRpc } from "./lnrpc";

declare module "@radar/lnrpc" {
  export * from "./config";
  export * from "./lnrpc";
  
  function createLnRpc(config: LnRpcClientConfig): Promise<LnRpc>;
  export = createLnRpc;
}
