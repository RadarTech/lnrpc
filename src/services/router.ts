import { ConnectionConfig } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Router GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createRouter(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const router = new grpcPkgObj.routerrpc.Router(
      server,
      credentials,
    );
    const subscriptionMethods = [
      'sendPaymentV2',
      'trackPaymentV2',
      'subscribeHtlcEvents',
      'sendPayment',
      'trackPayment',
      'htlcInterceptor',
    ];

    return createServiceClient({
      ...config,
      subscriptionMethods,
      service: router,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_ROUTER_SERVICE_ERR';
    throw e;
  }
}
