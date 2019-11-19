import { ConnectionConfig, NestedGrpcObject } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a WalletKit GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createWalletKit(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const { WalletKit } = grpcPkgObj.walletrpc as NestedGrpcObject;
    const walletKit = new WalletKit(
      server,
      credentials,
    );

    return createServiceClient({
      ...config,
      service: walletKit,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_WALLET_KIT_SERVICE_ERR';
    throw e;
  }
}
