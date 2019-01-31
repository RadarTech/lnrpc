import { LnRpcClientConfig } from "./config";
import { LnRpc } from "./lnrpc";

export * from "./config";
export * from "./lnrpc";

export default function createLnRpc(config: LnRpcClientConfig): Promise<LnRpc>;
