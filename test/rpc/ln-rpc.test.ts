import assert from 'assert';
import fs from 'fs';
import {join} from 'path';
import pkgDir from 'pkg-dir';
import {promisify} from 'util';
import packageJson from '../../package.json';
import createLnrpc from '../../src';
import { GrpcLoader } from '../../src/types';
import {grpcStub, LightningStub} from '../helpers/grpc-stub';

const {equal, fail} = assert;
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

describe('Lnrpc Factory', () => {
  const certStub = 'cert';

  describe('TLS settings', () => {
    it('should throw an error when tls file not found', () =>
      createLnrpc({tls: './not-a-file.cert'})
        .then(() => fail('failed to reject invalid SSL cert'))
        .catch((e) => assert(e, 'SSL cert not found')));

    it('should use configured `cert` over `tls` when provided', () => {
      const expected = Buffer.from('cert');

      return createLnrpc({
        cert: expected.toString(),
        tls: 'not-expected',
        grpc: grpcStub({
          credentials: {
            createSsl: (actual) => {
              assert(actual instanceof Buffer, 'cert is a Buffer instance');

              equal(
                actual.toString(),
                expected.toString(),
                'configures bufferized `cert` value',
              );
            },
          },
        }),
      });
    });

    it('should use configured `tls` when provided', (done) => {
      const expected = 'test-tls.cert';

      createLnrpc<any>({
        tls: expected,
        grpc: grpcStub({
          credentials: {
            createSsl: (actual) => {
              equal(actual, expected, 'configures provided `tls` value');
            },
          },
          loadPackageDefinition: () => {
            throw new Error('force error');
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it('should default to a system lnd SSL cert when unconfigured', (done) => {
      createLnrpc<any>({
        grpc: grpcStub({
          credentials: {
            createSsl: (cert) => {
              assert(/lnd\.conf$/.test(cert), 'used system SSL cert file path');
            },
          },
          loadPackageDefinition: () => {
            throw new Error('force error');
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it('should allow opting out of certificate pinning', (done) => {
      createLnrpc<any>({
        tls: false, // opt out
        grpc: grpcStub({
          credentials: {
            createSsl: (cert) => {
              assert(
                typeof cert === 'undefined',
                'opted out of SSL cert pinning',
              );
            },
          },
          loadPackageDefinition: () => {
            throw new Error('force error');
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it('should combine credentials when macaroon present', async () => {
      let tests = 0;
      const expSslCreds = {};
      const expMacaroonCreds = {};

      try {
        await createLnrpc({
          cert: '123',
          macaroon: '746573740a',
          grpc: grpcStub({
            credentials: {
              createSsl: () => expSslCreds,
              createFromMetadataGenerator: (cb) => {
                cb({}, () => { /* noop */ });
                return expMacaroonCreds;
              },
              combineChannelCredentials: (sslCreds, macaroonCreds) => {
                equal(sslCreds, expSslCreds, 'has expected ssl credentials');
                equal(
                  macaroonCreds,
                  expMacaroonCreds,
                  'has expected macaroon credentials',
                );
                tests++;
              },
            },
            loadPackageDefinition: () => {
              throw new Error('force error');
            },
          }),
        });
      } catch (e) { /* noop */ }

      equal(tests, 1, 'called `combineChannelCredentials`');
    });
  });

  describe('macaroon settings', () => {
    let macaroonDest;
    const macaroonTxt = 'test';
    const macaroonHex = '74657374';

    before(async () => {
      const root = await pkgDir(__dirname);
      macaroonDest = join(root, 'test.macaroon');
      await writeFile(macaroonDest, macaroonTxt, 'utf8');
    });

    after(async () => {
      await unlink(macaroonDest);
    });

    it('should set hex encoded macaroon from `macaroonPath`', async () => {
      let tests = 0;

      const CustomMetadataStub = () => { /* noop */ };
      CustomMetadataStub.prototype.add = (_, macaroon) => {
        tests++;
        equal(macaroon, macaroonHex);
      };

      try {
        await createLnrpc({
          cert: '123',
          macaroonPath: macaroonDest,
          grpc: grpcStub({
            Metadata: CustomMetadataStub,
            loadPackageDefinition: () => {
              throw new Error('force error');
            },
          }),
        });
      } catch (e) { /* noop */ }

      equal(tests, 1, 'called Metadata.add with macaroon');
    });

    it('should set macaroon from `macaroon` hex string', async () => {
      let tests = 0;

      const CustomMetadataStub = () => { /* noop */ };
      CustomMetadataStub.prototype.add = (_, macaroon) => {
        tests++;
        equal(macaroon, macaroonHex);
      };

      try {
        await createLnrpc({
          cert: '123',
          macaroon: macaroonHex,
          grpc: grpcStub({
            Metadata: CustomMetadataStub,
            loadPackageDefinition: () => {
              throw new Error('force error');
            },
          }),
        });
      } catch (e) { /* noop */ }

      equal(tests, 1, 'called Metadata.add with macaroon');
    });
  });

  describe('grpc lnd/proto instantiation', () => {
    // tslint:disable-next-line:max-line-length
    it('should load `./lnd/lnd_version/rpc.proto` and `./lnd/lnd_version/walletunlocker.proto` via `grpc.loadSync()`', async () => {
      const root = await pkgDir(__dirname);
      const expectedPath = join(
        root,
        `lnd/${packageJson.config['lnd-release-tag']}`,
      );
      const expected = new RegExp(`${expectedPath}/(rpc\\.proto|walletunlocker\\.proto)$`);

      return createLnrpc({
        grpcLoader: {
          loadSync(actual) {
            assert(expected.test(actual), 'loaded generated proto file via load');
            return {};
          },
        } as unknown as GrpcLoader,
        grpc: grpcStub(),
        cert: certStub,
      });
    });

    it('should default to server `localhost:10001`', () => {
      const expected = 'localhost:10001';

      return createLnrpc({
        grpc: grpcStub({}, (actual) => {
          equal(actual, expected, 'defaults to expected server');
          return new LightningStub();
        }),
        cert: certStub,
      });
    });

    it('should connect to a configured server address', () => {
      const expected = 'localhost:30001';

      return createLnrpc({
        server: expected,
        grpc: grpcStub({}, (actual) => {
          equal(actual, expected, 'recieved configured server');
          return new LightningStub();
        }),
        cert: certStub,
      });
    });
  });

  describe('proxy instance', () => {
    it('should provide access to GRPC Package Definition', () => {
      return createLnrpc<{ description: object }>({
        grpc: grpcStub(),
        cert: certStub,
      }).then((lnrpc) => {
        equal(typeof lnrpc.description, 'object');
      });
    });

    it('should provide access to the lightning instance', () => {
      const expected = {};
      return createLnrpc<{ lightning: object }>({
        grpc: grpcStub(),
        lightning: expected,
        cert: certStub},
      ).then(
        (lnrpc) => {
          equal(lnrpc.lightning, expected);
        },
      );
    });

    it('should provide access to the wallet unlocker instance', () => {
      const expected = {};
      return createLnrpc<{ walletUnlocker: object }>({
        grpc: grpcStub(),
        walletUnlocker: expected,
        cert: certStub,
      }).then((lnrpc) => {
        equal(lnrpc.walletUnlocker, expected);
      });
    });

    it('should provide all lightning methods top-level', () => {
      return createLnrpc<{ test: () => void }>({
        grpc: grpcStub(),
        lightning: {test: () => { /* noop */ }},
        cert: certStub,
      }).then((lnrpc) => {
        equal(typeof lnrpc.test, 'function');
      });
    });

    it('should provide all wallet unlocker methods top-level', () => {
      return createLnrpc<{ test: () => void }>({
        grpc: grpcStub(),
        walletUnlocker: {test: () => { /* noop */ }},
        cert: certStub,
      }).then((lnrpc) => {
        equal(typeof lnrpc.test, 'function');
      });
    });
  });
});

process.on('unhandledRejection', () => { /* noop */ });
