import { ConnectionConfig } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Chain Notifier GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createChainNotifier(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const chainNotifier = new grpcPkgObj.chainrpc.ChainNotifier(
      server,
      credentials,
    );
    const subscriptionMethods = [
      'registerConfirmationsNtfn',
      'registerSpendNtfn',
      'registerBlockEpochNtfn',
    ];

    return createServiceClient({
      ...config,
      subscriptionMethods,
      service: chainNotifier,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_CHAIN_NOTIFIER_SERVICE_ERR';
    throw e;
  }
}
