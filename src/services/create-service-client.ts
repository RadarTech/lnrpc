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
  return new Proxy(config.service, {
     /**
      * Promisify any requested (non-subscription) lightning RPC method
      * @param target
      * @param key
      */
    get(target: unknown, key: string) {
      const method = target[key];

      if (typeof method !== 'function') {
        return target[key]; // forward
      } else if (config.subscriptionMethods) {
        if (config.subscriptionMethods.includes(key)) {
          return defaultEmptyArg(method, false);
        }
      }
      return promisify(defaultEmptyArg(method));
    },
  });
}
