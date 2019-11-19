import { ConnectionConfig, NestedGrpcObject, SubscriptionMethod } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Router GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createRouter(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const { Router } = grpcPkgObj.routerrpc as NestedGrpcObject;
    const router = new Router(
      server,
      credentials,
    );
    const subscriptionMethods: SubscriptionMethod[] = [
      {
        name: 'sendPayment',
      },
      {
        name: 'trackPayment',
      },
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
