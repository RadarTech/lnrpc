import { ConnectionConfig } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Autopilot GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createAutopilot(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const autopilot = new grpcPkgObj.autopilotrpc.Autopilot(
      server,
      credentials,
    );

    return createServiceClient({
      ...config,
      service: autopilot,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_AUTOPILOT_SERVICE_ERR';
    throw e;
  }
}
