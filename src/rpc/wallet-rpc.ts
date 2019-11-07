import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createWalletKit } from '../services';
import { WalletRpcConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a walletrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1)  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2)  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to walletrpc instance
 */
export async function createWalletRpc(userConfig: WalletRpcConfig) {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/walletrpc/walletkit.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { walletKit, server, grpcLoader, grpc } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Walletrpc instance
   */
  const walletrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    walletKit: {
      value:
        walletKit || createWalletKit({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(walletrpc, {
    /**
     * Provide lop-level access to any walletKit
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.walletKit[key] === 'function') {
        return target.walletKit[key].bind(target.walletKit);
      } else {
        return target[key]; // forward
      }
    },
  });
}
