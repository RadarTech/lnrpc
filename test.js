const assert = require('assert');
const pkgDir = require('pkg-dir');
const fs = require('fs');
const {join} = require('path');
const {promisify} = require('util');
const os = require('os');

const createLnrpc = require('./index');

const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const {assign} = Object;
const {equal, fail} = assert;

describe('npm postinstall', () => {
  before(async () => {
    const isMac = /^darwin/.test(process.platform);
    const certDir = join(
      os.homedir(),
      isMac ? 'Library/Application Support/Lnd' : '.lnd'
    );
    const certFile = join(certDir, 'tls.cert');

    /*
     Ensure SSL cert dir exits
     */
    try {
      await stat(certDir);
    } catch (e) {
      await mkdir(certDir);
    }

    /*
     Ensure SSL cert file exists
     */
     try {
       await stat(certFile);
     } catch (e) {
       await writeFile(certFile, '--test-cert--');
     }
  });

  it('should install lnd under `node_modules/lnd`', async () => {
    const root = await pkgDir(__dirname);

    return stat(join(root, 'node_modules/lnd'))
    .then(() => assert(true, '`node_modules/lnd` exists'))
    .catch((e) => assert.fail('`node_modules/lnd` was not installed'));
  });
});

describe('TLS settings', () => {
  it('should throw an error when tls file not found', () =>
    createLnrpc({tls: './not-a-file.cert'})
    .then(() => fail('failed to reject invalid SSL cert'))
    .catch((e) => assert(e, 'SSL cert not found'))
  );

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

  it('should generate an `rpc.proto` without google annotations', async () => {
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

describe('lnrpc factory', () => {
  it('should not modify arguments', () =>
    createLnrpc(Object.freeze({
      server: 'localhost:10003',
      tls: './my.cert',
      cert: 'trust me',
      grpc: grpcStub(),
    }))
  );

  it('should allow getting on proxy target', async () => {
    const expected = {name: 'test'};

    const instance = await createLnrpc({
      grpc: grpcStub({}, function() {
        return expected;
      }),
    });

    equal(instance.name, expected.name, 'proxy forwards to target properties');
  });

  it('should allow setting on proxy target', async () => {
    const expected = {};

    const instance = await createLnrpc({
      grpc: grpcStub({}, function() {
        return expected;
      }),
    });

    instance.name = 'test';
    equal(instance.name, expected.name, 'proxy sets target properties');
  });

  it('should provide promisified target methods', async () => {
    const expected = 'test';
    const target = {
      getInfo: (options, cb) => cb(null, expected),
    };

    const instance = await createLnrpc({
      grpc: grpcStub({}, function() {
        return target;
      }),
    });

    const actual = await instance.getInfo({});
    equal(actual, expected, 'promisified `getInfo` target method');
  });

  it('should forward streaming methods, unmodified', async () => {
    const expected = {on() {}, write() {}}; // RPC streaming response interface
    const subscriptionMethods = ['stream1', 'stream2'];
    const target = {
      stream1: () => expected,
      stream2: () => expected,
    };

    const instance = await createLnrpc({
      subscriptionMethods,
      grpc: grpcStub({}, function() {
        return target;
      }),
    });

    subscriptionMethods.forEach((method) => {
      equal(instance[method](), expected, 'forwards original method');
    });
  });
});

/**
 * Create a grpc stub
 * @param  {Object?}        options
 * @param  {LightningStub?} lightning
 * @return {Object}
 */
function grpcStub(options = {}, lightning = LightningStub) {
  // provide mock cert if none specified
  const config = assign({}, options);
  if (!config.tls || !config.cert) config.cert = 'cert';

  return assign({
    credentials: {createSsl: () => ({})},
    load: () => ({
      lnrpc: {
        Lightning: lightning,
      },
    }),
  }, config);
}

/**
 * Lightning RPC Stub
 * @constructor
 */
function LightningStub() {}

process.on('unhandledRejection', () => {});
