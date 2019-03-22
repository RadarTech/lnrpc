const fs = require('fs');
const pkgDir = require('pkg-dir');
const {join} = require('path');
const {promisify} = require('util');
const protoLoader = require('@grpc/proto-loader');
const GRPC = require('grpc');
const createLightning = require('./lightning');
const createWalletUnlocker = require('./wallet-unlocker');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const packageJson = require('../package.json');

const HOME_DIR = require('os').homedir();
const DEFAULTS = {
  grpc: GRPC,
  grpcLoader: protoLoader,
  server: 'localhost:10001',
  macaroonPath: '',
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
module.exports = async function createLnRpc(config = {}) {
  const rootPath = await pkgDir(__dirname);
  const protoSrc = join(
    rootPath,
    `lnd/${packageJson.config['lnd-release-tag']}/rpc.proto`,
  );
  const protoDest = join(rootPath, 'rpc.proto');

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

  /*
   Generate grpc SSL credentials
   */
  let credentials;

  try {
    // Use SSL cert string or fallback to file path
    let cert = config.cert || (await readFile(tlsPath));

    /*
     Convert `cert` string to Buffer
     */
    if (!Buffer.isBuffer(cert)) {
      cert = Buffer.from(cert);
    }

    /*
     Required for lnd SSL handshake: (SSL_ERROR_SSL: error:14094410)
     More about GRPC environment variables here:
     https://grpc.io/grpc/core/md_doc_environment_variables.html
    */
    if (!process.env.GRPC_SSL_CIPHER_SUITES) {
      process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
    }

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
      Buffer.isBuffer(macaroon) ? macaroon.toString('hex') : macaroon
    );

    // Create macaroon credentials
    const macaroonCredentials = grpc.credentials.createFromMetadataGenerator(
      (_, callback) => {
        callback(null, metadata);
      }
    );

    // Update existing cert credentials by combining macaroon auth
    // credentials such that every call is properly encrypted and
    // authenticated
    credentials = grpc.credentials.combineChannelCredentials(
      credentials,
      macaroonCredentials
    );
  }

  /*
   Write `rpc.proto` if none exists
   */
  try {
    await stat(protoDest);
  } catch (e) {
    // file doesn't exist
    let grpcSrc = await readFile(protoSrc, 'utf8');

    // remove google annotations causing parse error on `grpc.load()`
    grpcSrc = grpcSrc.replace('import "google/api/annotations.proto";', '');
    await writeFile(protoDest, grpcSrc);
  }

  /**
   * Create RPC from proto and return GRPC
   * @type {grpc.PackageDefinition}
   */
  let grpcPkgObj;

  try {
    const packageDefinition = await grpcLoader.load(protoDest, {
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
        lightning || createLightning(grpcPkgObj, server, credentials, config),
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
};
