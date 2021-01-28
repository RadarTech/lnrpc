import { promisify } from 'util';
import { defaultEmptyArg } from '../default-empty-arg';
import { GrpcServiceConfig } from '../types';

/**
 * Create a GRPC service client proxy
 * The Proxy serves two purposes:
 * - Wrap non-subscription methods in promises
 * - Immediately return subscription methods and properties
 * @param config The GRPC service configuration
 */
export function createServiceClient(config: GrpcServiceConfig) {
  // create a list of function names on the service class to prevent
  // promisifying internal functions on the base class grpc.Client
  const ownProps = Object.getOwnPropertyNames(
    Object.getPrototypeOf(config.service),
  );

  return new Proxy(config.service, {
     /**
      * Promisify any requested (non-subscription) lightning RPC method
      * @param target
      * @param key
      */
    get(target: unknown, key: string) {
      const method = target[key];

      if (typeof method !== 'function' || !ownProps.includes(key)) {
        // forward non-function properties and base class functions
        return target[key];
      } else if (config.subscriptionMethods) {
        if (config.subscriptionMethods.includes(key)) {
          return defaultEmptyArg(method, false);
        }
      }
      return promisify(defaultEmptyArg(method));
    },
  });
}
