import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createAutopilot } from '../services';
import { AutopilotRpcConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a autopilotrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1)  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2)  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to autopilotrpc instance
 */
export async function createAutopilotRpc(userConfig: AutopilotRpcConfig) {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/autopilotrpc/autopilot.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { autopilot, server, grpcLoader, grpc } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Autopilotrpc instance
   */
  const autopilotrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    autopilot: {
      value:
        autopilot || createAutopilot({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(autopilotrpc, {
    /**
     * Provide lop-level access to any autopilot
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.autopilot[key] === 'function') {
        return target.autopilot[key].bind(target.autopilot);
      } else {
        return target[key]; // forward
      }
    },
  });
}
