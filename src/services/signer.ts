import { ConnectionConfig, NestedGrpcObject } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Signer GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createSigner(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const { Signer } = grpcPkgObj.signrpc as NestedGrpcObject;
    const signer = new Signer(
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
