import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createChainNotifier } from '../services';
import { ChainRpc, ChainRpcClientConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a chainrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1.  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2.  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to chainrpc instance
 */
export async function createChainRpc<T = unknown>(userConfig: ChainRpcClientConfig): Promise<T & ChainRpc> {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/chainrpc/chainnotifier.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { chainNotifier, server, grpcLoader, grpc, includeDefaults } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    includeDefaults,
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Chainrpc instance
   * @type {chainrpc}
   */
  const chainrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    chainNotifier: {
      value:
        chainNotifier || createChainNotifier({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(chainrpc, {
    /**
     * Provide lop-level access to any chainnotifier
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.chainNotifier[key] === 'function') {
        return target.chainNotifier[key].bind(target.chainNotifier);
      } else {
        return target[key]; // forward
      }
    },
  });
}
