import { ConnectionConfig, SubscriptionMethod } from '../types';
import { createServiceClient } from './create-service-client';

/**
 * Create a Invoices GRPC service client proxy
 * @param config The grpc service configuration
 */
export function createInvoices(config: ConnectionConfig): any {
  try {
    const { grpcPkgObj, server, credentials } = config;
    const invoices = new grpcPkgObj.invoicesrpc.Invoices(
      server,
      credentials,
    );
    const subscriptionMethods: SubscriptionMethod[] = [
      {
        name: 'subscribeSingleInvoice',
        skipEmptyArgDefault: true,
      },
    ];

    return createServiceClient({
      ...config,
      subscriptionMethods,
      service: invoices,
    });
  } catch (e) {
    if (!e.code) e.code = 'GRPC_INVOICES_SERVICE_ERR';
    throw e;
  }
}
