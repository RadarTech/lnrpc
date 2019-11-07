import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createWatchtowerClient } from '../services';
import { WtClientRpcConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a wtclientrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1)  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2)  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to wtclientrpc instance
 */
export async function createWtClientRpc(userConfig: WtClientRpcConfig) {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/wtclientrpc/wtclient.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { watchtowerClient, server, grpcLoader, grpc } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Wtclientrpc instance
   */
  const wtclientrpc = Object.create(null, {
    description: {value: grpcPkgObj},
      watchtowerClient: {
      value:
        watchtowerClient || createWatchtowerClient({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(wtclientrpc, {
    /**
     * Provide lop-level access to any wtClient
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.watchtowerClient[key] === 'function') {
        return target.watchtowerClient[key].bind(target.watchtowerClient);
      } else {
        return target[key]; // forward
      }
    },
  });
}
