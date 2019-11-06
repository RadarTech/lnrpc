import { promisify } from 'util';
import { defaultEmptyArg } from '../default-empty-arg';

const DEFAULTS = {
  subscriptionMethods: [
    'registerConfirmationsNtfn',
    'registerBlockEpochNtfn',
  ],
};

/**
 * Factory for a Chain Notifier GRPC service proxy
 *
 * Proxy serves two purposes:
 *  - Wrap non-subscription methods in promises
 *  - Immediately return subscription methods and properties
 *
 * @param  {grpc.PackageDefinition}   lnrpcDescriptor
 * @param  {String}                   server
 * @param  {Object}                   credentials
 * @param  {Object}                   config
 * @return {Proxy}
 */
export function createChainNotifier(
  lnrpcDescriptor,
  server,
  credentials,
  config = {},
) {
  // Configuration options
  const {subscriptionMethods} = Object.assign({}, DEFAULTS, config);

  /**
   * GRPC ChainNotifier Service
   * @type {lnrpc.ChainNotifier}
   */
  let chainNotifier;

  try {
    chainNotifier = new lnrpcDescriptor.chainrpc.ChainNotifier(server, credentials);
  } catch (e) {
    if (!e.code) e.code = 'GRPC_CHAIN_NOTIFIER_SERVICE_ERR';
    throw e;
  }

  return new Proxy(chainNotifier, {
    /**
     * Promisify any requested (non-subscription) lightning RPC method
     * @param  {lnrpc.Lightning} target
     * @param  {String}          key
     * @return {Any}
     */
    get(target, key: string) {
      const method = target[key];

      if (typeof method !== 'function') {
        return target[key]; // forward
      } else {
        if (subscriptionMethods.includes(key)) {
          return defaultEmptyArg(method);
        }
        return promisify(defaultEmptyArg(method));
      }
    },
  });
}
