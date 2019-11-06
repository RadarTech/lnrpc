import { ConnectionConfig } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a wallet unlocker GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createWalletUnlocker(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const walletUnlocker = new grpcPkgObj.lnrpc.WalletUnlocker(
      server,
      credentials,
    );

    return createServiceClient({
      ...config,
      service: walletUnlocker,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_WALLET_UNLOCKER_SERVICE_ERR';
    throw e;
  }
}
