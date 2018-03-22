const GRPC = require('grpc');
const fs = require('fs');
const {join} = require('path');
const {promisify} = require('util');
const pkgDir = require('pkg-dir');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const HOME_DIR = require('os').homedir();
const DEFAULTS = {
  grpc: GRPC,
  server: 'localhost:10001',
  tls: /^darwin/.test(process.platform) // is macOS?
      ? `${HOME_DIR}/Library/Application Support/Lnd/tls.cert`
      : `${HOME_DIR}/.lnd/tls.cert`,
  subscriptionMethods: [
    'subscribeInvoices',
    'subscribeTransactions',
    'subscribeChannelGraph',
    'sendPayment',
    'openChannel',
    'closeChannel',
  ],
};

/**
 * Factory for lnrpc instance
 * @param  {Object} config
 * @return {Promise} - Returns proxy to lnrpc instance
 */
module.exports = async function createLnprc(config = {}) {
  const rootPath = await pkgDir(__dirname);
  const protoSrc = join(rootPath, 'node_modules/lnd/lnrpc/rpc.proto');
  const protoDest = join(rootPath, 'rpc.proto');

  /*
   Configuration options
   */
  const {
    grpc,
    server,
    tls: tlsPath,
    subscriptionMethods,
  } = Object.assign({}, DEFAULTS, config);

  /*
   Generate grpc SSL credentials
   */
  let credentials;

  try {
    // Use SSL cert string or fallback to file path
    let cert = (config.cert || await readFile(tlsPath));

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
   Write `rpc.proto` if none exists
   */
  try {
    await stat(protoDest);
  } catch (e) { // file doesn't exist
    let grpcSrc = await readFile(protoSrc, 'utf8');

    // remove google annotations causing parse error on `grpc.load()`
    grpcSrc = grpcSrc.replace('import "google/api/annotations.proto";', '');
    await writeFile(protoDest, grpcSrc);
  }

  /*
   Create RPC from proto and return lnrpc.Lightning instance
   */
  let lnrpc;

  try {
    const lnrpcDescriptor = grpc.load(protoDest);
    lnrpc = new lnrpcDescriptor.lnrpc.Lightning(server, credentials);
  } catch (e) {
    if (!e.code) e.code = 'GRPC_LOAD_ERR';
    throw e;
  }

  // Resolve proxy instance
  return new Proxy(lnrpc, {

    /**
     * Promisify each lightning RPC method
     * @param  {lnrpc.Lightning} target
     * @param  {String}          key
     * @return {Promise} {Any}
     */
    get(target, key) {
      const method = target[key];

      if (typeof method !== 'function' || subscriptionMethods.includes(key)) {
        return target[key]; // forward
      } else {
        return promisify(method);
      }
    },
  });
};
