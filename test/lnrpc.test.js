const fs = require('fs');
const assert = require('assert');
const pkgDir = require('pkg-dir');
const {join} = require('path');
const {promisify} = require('util');
const createLnrpc = require('../lib/lnrpc');
const grpcStub = require('./helpers/grpc-stub');
const {equal, fail} = assert;
const {LightningStub} = grpcStub;
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

describe('Lnrpc Factory', () => {
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
                'configures bufferized `cert` value'
              );
            },
          },
        }),
      });
    });

    it('should use configured `tls` when provided', (done) => {
      const expected = 'test-tls.cert';

      createLnrpc({
        tls: expected,
        grpc: grpcStub({
          credentials: {
            createSsl: (actual) => {
              equal(actual, expected, 'configures provided `tls` value');
            },
          },
          load: () => {
            throw new Error('force error');
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it('should default to a system lnd SSL cert when unconfigured', (done) => {
      createLnrpc({
        grpc: grpcStub({
          credentials: {
            createSsl: (cert) => {
              assert(/lnd\.conf$/.test(cert), 'used system SSL cert file path');
            },
          },
          load: () => {
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
                setTimeout(() => cb({}, () => {}));
                return expMacaroonCreds;
              },
              combineChannelCredentials: (sslCreds, macaroonCreds) => {
                equal(sslCreds, expSslCreds, 'has expected ssl credentials');
                equal(
                  macaroonCreds,
                  expMacaroonCreds,
                  'has expected macaroon credentials'
                );
                tests++;
              },
            },
            load: () => {
              throw new Error('force error');
            },
          }),
        });
      } catch (e) {} // eslint-disable-line

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

      const CustomMetadataStub = function() {};
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
            load: () => {
              throw new Error('force error');
            },
          }),
        });
      } catch (e) {} // eslint-disable-line

      equal(tests, 1, 'called Metadata.add with macaroon');
    });

    it('should set macaroon from `macaroon` hex string', async () => {
      let tests = 0;

      const CustomMetadataStub = function() {};
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
            load: () => {
              throw new Error('force error');
            },
          }),
        });
      } catch (e) {} // eslint-disable-line

      equal(tests, 1, 'called Metadata.add with macaroon');
    });
  });

  describe('grpc lnd/proto instantiation', () => {
    it('should generate an `rpc.proto` file in root', async () => {
      let protoDest = '';

      try {
        const root = await pkgDir(__dirname);
        protoDest = join(root, 'rpc.proto');
        await unlink(protoDest);
      } catch (e) {
        // ensure rpc.proto file gets removed
      }

      await createLnrpc({grpc: grpcStub()});

      try {
        await stat(protoDest);
      } catch (e) {
        fail('failed to generate `rpc.proto` file');
      }
    });

    it('should generate a `rpc.proto` without google annotations', async () => {
      await createLnrpc({grpc: grpcStub()});

      const root = await pkgDir(__dirname);
      const rpcProto = await readFile(join(root, 'rpc.proto'), 'utf-8');

      equal(
        rpcProto.search('google/api/annotations.proto'),
        -1,
        'rpc.proto contains no google annotations'
      );
    });

    it('should load `./rpc.proto` filename via `grpc.load()`', async () => {
      const root = await pkgDir(__dirname);
      const expected = join(root, 'rpc.proto');

      return createLnrpc({
        grpc: grpcStub({
          load: (actual) => {
            equal(actual, expected, 'loaded generated `rpc.proto` via load');
            return grpcStub().load();
          },
        }),
      });
    });

    it('should default to server `localhost:10001`', () => {
      const expected = 'localhost:10001';

      return createLnrpc({
        grpc: grpcStub({}, function(actual) {
          equal(actual, expected, 'defaults to expected server');
          return new LightningStub();
        }),
      });
    });

    it('should connect to a configured server address', () => {
      const expected = 'localhost:30001';

      return createLnrpc({
        server: expected,
        grpc: grpcStub({}, function(actual) {
          equal(actual, expected, 'recieved configured server');
          return new LightningStub();
        }),
      });
    });
  });

  describe('proxy instance', () => {
    it('should provide access to GRPC Package Definition', () => {
      return createLnrpc({grpc: grpcStub()}).then((lnrpc) => {
        equal(typeof lnrpc.description, 'object');
      });
    });

    it('should provide access to the lightning instance', () => {
      const expected = {};
      return createLnrpc({grpc: grpcStub(), lightning: expected}).then(
        (lnrpc) => {
          equal(lnrpc.lightning, expected);
        }
      );
    });

    it('should provide access to the wallet unlocker instance', () => {
      const expected = {};
      return createLnrpc({
        grpc: grpcStub(),
        walletUnlocker: expected,
      }).then((lnrpc) => {
        equal(lnrpc.walletUnlocker, expected);
      });
    });

    it('should provide all lightning methods top-level', () => {
      return createLnrpc({
        grpc: grpcStub(),
        lightning: {test: () => {}},
      }).then((lnrpc) => {
        equal(typeof lnrpc.test, 'function');
      });
    });

    it('should provide all wallet unlocker methods top-level', () => {
      return createLnrpc({
        grpc: grpcStub(),
        walletUnlocker: {test: () => {}},
      }).then((lnrpc) => {
        equal(typeof lnrpc.test, 'function');
      });
    });
  });
});

process.on('unhandledRejection', () => {});
