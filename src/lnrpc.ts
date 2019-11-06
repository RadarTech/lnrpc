import * as protoLoader from '@grpc/proto-loader';
import fs from 'fs';
import GRPC from 'grpc';
import os from 'os';
import { join } from 'path';
import pkgDir from 'pkg-dir';
import { promisify } from 'util';
import packageJson from '../package.json';
import { createLightningProxy } from './lightning';
import { createWalletUnlocker } from './wallet-unlocker';

const readFile = promisify(fs.readFile);

const HOME_DIR = os.homedir();
const DEFAULTS = {
  grpc: GRPC,
  grpcLoader: protoLoader,
  server: 'localhost:10001',
  macaroonPath: '',
  certEncoding: 'utf8',
  tls: /^darwin/.test(process.platform) // is macOS?
    ? `${HOME_DIR}/Library/Application Support/Lnd/tls.cert`
    : `${HOME_DIR}/.lnd/tls.cert`,
};

/**
 * Factory for a lnrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1)  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2)  Allow basic user property requests to all GRPC Services
 *
 * @param  {Object} config
 * @return {Promise} - Returns proxy to lnrpc instance
 */
export async function createLnRpc(config: any = {}) {
  const rootPath = await pkgDir(__dirname);
  const protoFile = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/rpc.proto`,
  );

  /*
   Configuration options
   */
  const {
    grpc,
    grpcLoader,
    server,
    tls: tlsPath,
    lightning,
    walletUnlocker,
    macaroonPath,
  } = Object.assign({}, DEFAULTS, config);

  // Generate grpc SSL credentials
  let credentials;

  try {
    // Use any SSL cert
    let { cert } = config;
    const { certEncoding } = config;

    // Fallback optional .tls file path
    if (!cert && tlsPath) {
      cert = await readFile(tlsPath);
    }

    // Convert `cert` string to Buffer
    if (cert && !Buffer.isBuffer(cert)) {
      cert = Buffer.from(cert, certEncoding);
    }

    // Required for lnd SSL handshake when a cert is provided:
    // (SSL_ERROR_SSL: error:14094410)
    // More about GRPC environment variables here:
    // https://grpc.io/grpc/core/md_doc_environment_variables.html
    if (cert && !process.env.GRPC_SSL_CIPHER_SUITES) {
      process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
    }

    // NOTE: cert may be undefined at this point
    // which is desirable for when certificate pinning
    // is not necessary (i.e. BTCPayServer connection)
    credentials = grpc.credentials.createSsl(cert);
  } catch (e) {
    if (!e.code) e.code = 'INVALID_SSL_CERT';
    throw e;
  }

  /*
   Combine SSL and Macaroon credentials
   */
  if (config.macaroon || macaroonPath) {
    const metadata = new grpc.Metadata();
    const macaroon = config.macaroon || (await readFile(macaroonPath));

    // Add hex encoded macaroon
    // to gRPC metadata
    metadata.add(
      'macaroon',
      Buffer.isBuffer(macaroon) ? macaroon.toString('hex') : macaroon,
    );

    // Create macaroon credentials
    const macaroonCredentials = grpc.credentials.createFromMetadataGenerator(
      (_, callback) => {
        callback(null, metadata);
      },
    );

    // Update existing cert credentials by combining macaroon auth
    // credentials such that every call is properly encrypted and
    // authenticated
    credentials = grpc.credentials.combineChannelCredentials(
      credentials,
      macaroonCredentials,
    );
  }

  /**
   * Create RPC from proto and return GRPC
   * @type {grpc.PackageDefinition}
   */
  let grpcPkgObj;

  try {
    const packageDefinition = grpcLoader.loadSync(protoFile, {
      longs: String,
    });
    grpcPkgObj = grpc.loadPackageDefinition(packageDefinition);
  } catch (e) {
    if (!e.code) e.code = 'GRPC_LOAD_ERR';
    throw e;
  }

  /**
   * Lnrpc instance
   * @type {lnrpc}
   */
  const lnrpc = Object.create(null, {
    description: {value: grpcPkgObj},
    lightning: {
      value:
        lightning || createLightningProxy(grpcPkgObj, server, credentials, config),
    },
    walletUnlocker: {
      value:
        walletUnlocker || createWalletUnlocker(grpcPkgObj, server, credentials),
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
