import { ConnectionConfig } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a WatchtowerClient service client proxy
 * @param config The grpc service configuration
 */
export function createWatchtowerClient(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const watchtowerClient = new grpcPkgObj.wtclientrpc.WatchtowerClient(
      server,
      credentials,
    );

    return createServiceClient({
      ...config,
      service: watchtowerClient,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_WATCHTOWER_CLIENT_SERVICE_ERR';
    throw e;
  }
}
