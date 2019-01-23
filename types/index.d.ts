import { LnRpcClientConfig } from "./config";
import { LnRpc } from "./lnrpc";

export * from "./config";
export * from "./lnrpc";
export * from "./generated/rpc_pb";

export default function createLnRpc(config: LnRpcClientConfig): Promise<LnRpc>;
