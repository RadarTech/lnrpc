import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createLightning, createWalletUnlocker } from '../services';
import { LnRpcConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a lnrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1)  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2)  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to lnrpc instance
 */
export async function createLnRpc(userConfig: LnRpcConfig) {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/rpc.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { lightning, walletUnlocker, server, grpcLoader, grpc } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Lnrpc instance
   * @type {lnrpc}
   */
  const lnrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    lightning: {
      value:
        lightning || createLightning({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
    walletUnlocker: {
      value:
        walletUnlocker || createWalletUnlocker({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(lnrpc, {
    /**
     * Provide lop-level access to any lightning/walletUnlocker
     * methods, otherwise provide user with fallback value
     * @param  {lnrpc.Lightning} target
     * @param  {String}          key
     * @return {Any}
     */
    get(target, key) {
      if (typeof target.lightning[key] === 'function') {
        return target.lightning[key].bind(target.lightning);
      } else if (typeof target.walletUnlocker[key] === 'function') {
        return target.walletUnlocker[key].bind(target.walletUnlocker);
      } else {
        return target[key]; // forward
      }
    },
  });
}
