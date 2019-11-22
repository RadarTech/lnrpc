import { ConnectionConfig } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Signer GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createSigner(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const signer = new grpcPkgObj.signrpc.Signer(
      server,
      credentials,
    );

    return createServiceClient({
      ...config,
      service: signer,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_SIGNER_SERVICE_ERR';
    throw e;
  }
}
