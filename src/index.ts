import { createLnRpc } from './rpc';

export * from './types';
export {
  createAutopilotRpc,
  createChainRpc,
  createInvoicesRpc,
  createLnRpc,
  createRouterRpc,
  createSignRpc,
  createWalletRpc,
  createWatchtowerRpc,
  createWtClientRpc,
} from './rpc';
export default createLnRpc;
