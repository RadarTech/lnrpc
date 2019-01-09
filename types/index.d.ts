import { LnRpcClientConfig } from './config';
import { LnRpc } from './lnrpc';

export default function createLnRpc(config: LnRpcClientConfig): Promise<LnRpc>;
