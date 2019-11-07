import { join } from 'path';
import pkgDir from 'pkg-dir';
import packageJson from '../../package.json';
import { createSigner } from '../services';
import { SignRpcClientConfig } from '../types';
import { createCredentials } from './create-credentials';
import { createGrpcObject } from './create-grpc-object';
import { defaults } from './defaults';

/**
 * Factory for a signrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1.  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2.  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to signrpc instance
 */
export async function createSignRpc(userConfig: SignRpcClientConfig) {
  const rootPath = await pkgDir(__dirname);
  const protoFilePath = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/signrpc/signer.proto`,
  );

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { signer, server, grpcLoader, grpc } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    protoFilePath,
    grpcLoader,
    grpc,
  });

  /**
   * Signrpc instance
   */
  const signrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    signer: {
      value:
        signer || createSigner({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(signrpc, {
    /**
     * Provide lop-level access to any signer
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.signer[key] === 'function') {
        return target.signer[key].bind(target.signer);
      } else {
        return target[key]; // forward
      }
    },
  });
}
