import { ChannelCredentials } from '@grpc/grpc-js';
import fs from 'fs';
import { promisify } from 'util';
import { RpcClientConfig } from '../types';

const readFile = promisify(fs.readFile);

/**
 * Generate grpc SSL credentials and combine with the macaroon
 * credentials if necessary.
 * @param config The rpc client configuration
 */
export async function createCredentials(config: RpcClientConfig): Promise<ChannelCredentials> {
  let credentials: ChannelCredentials;
  const { grpc } = config;

  try {
    // Use any SSL cert
    let { cert } = config;
    const { certEncoding, tls } = config;

      // Fallback optional .tls file path
    if (!cert && tls) {
        cert = await readFile(tls);
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
    credentials = grpc.credentials.createSsl(cert as Buffer);
  } catch (e) {
    if (!e.code) e.code = 'INVALID_SSL_CERT';
    throw e;
  }

  // Combine SSL and Macaroon credentials
  if (config.macaroon || config.macaroonPath) {
    const metadata = new grpc.Metadata();
    const macaroon = config.macaroon || (await readFile(config.macaroonPath));

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
  return credentials;
}
