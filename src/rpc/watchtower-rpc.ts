import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createWatchtower } from '../services';
import { WatchtowerRpcConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a watchtowerrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1)  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2)  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to watchtowerrpc instance
 */
export async function createWatchtowerRpc(userConfig: WatchtowerRpcConfig) {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/watchtowerrpc/watchtower.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { watchtower, server, grpcLoader, grpc } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Watchtowerrpc instance
   */
  const watchtowerrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    watchtower: {
      value:
        watchtower || createWatchtower({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(watchtowerrpc, {
    /**
     * Provide lop-level access to any watchtower
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.watchtower[key] === 'function') {
        return target.watchtower[key].bind(target.watchtower);
      } else {
        return target[key]; // forward
      }
    },
  });
}
