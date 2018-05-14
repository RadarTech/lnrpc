const {promisify} = require('util');

/**
 * Factory for wallet unlocker instance
 *
 * Proxy serves two purposes:
 *  - Wrap all methods in promises
 *  - Immediately return properties
 *
 * @param  {grpc.PackageDefinition}   lnrpcDescriptor
 * @param  {String}                   server
 * @param  {Object}                   credentials
 * @return {Proxy}
 */
module.exports = function createWalletUnlocker(
  lnrpcDescriptor,
  server,
  credentials
) {
  /**
   * GRPC Lightning Service
   * @type {lnrpc.WalletUnlocker}
   */
  let walletUnlocker;

  try {
    walletUnlocker = new lnrpcDescriptor.lnrpc.WalletUnlocker(
      server,
      credentials
    );
  } catch (e) {
    if (!e.code) e.code = 'GRPC_WALLET_UNLOCKER_SERVICE_ERR';
    throw e;
  }

  return new Proxy(walletUnlocker, {
    /**
     * Promisify any requested wallet unlocker RPC method
     * @param  {lnrpc.WalletUnlocker} target
     * @param  {String}               key
     * @return {Any}
     */
    get(target, key) {
      const method = target[key];

      if (typeof method !== 'function') {
        return target[key]; // forward
      } else {
        return promisify(method);
      }
    },
  });
};
