const assert = require('assert');
const createWalletUnlocker = require('../lib/wallet-unlocker');
const grpcStub = require('./helpers/grpc-stub');
const {equal} = assert;

const {stringify} = JSON;

describe('Wallet Unlocker Service', () => {
  it('should not modify arguments', () => {
    const descriptor = grpcStub().loadPackageDefinition();
    const expDescriptor = stringify(descriptor);
    const server = 'localhost:10003';
    const expServer = `${server}`;
    const credentials = {};
    const expCredentials = stringify(credentials);

    createWalletUnlocker(descriptor, server, credentials);

    equal(stringify(descriptor), expDescriptor, 'has expected descriptor');
    equal(server, expServer, 'has expected server');
    equal(stringify(credentials), expCredentials, 'has expected credentials');
  });

  it('should throw when unable to create wallet unlocker service', () => {
    let expectedErr;

    try {
      /**
       * Custom WalletUnlockerStub
       * @constructor
       */
      const WalletUnlockerCustomStub = function() {
        throw new Error();
      };

      const descriptor = grpcStub(
        {},
        grpcStub.LightningStub,
        WalletUnlockerCustomStub
      ).loadPackageDefinition();

      assert.throws(
        () => createWalletUnlocker(descriptor, 'localhost:1', {}),
        (e) => {
          expectedErr = e;
          return true;
        }
      );
    } catch (_) {} // eslint-disable-line

    return new Promise((resolve) => {
      equal(
        expectedErr && expectedErr.code,
        'GRPC_WALLET_UNLOCKER_SERVICE_ERR',
        'has expected error'
      );
      resolve();
    });
  });

  it('should allow getting on proxy target', () => {
    const expected = 'test';

    /**
     * Custom WalletUnlockerStub
     * @constructor
     */
    function WalletUnlockerCustomStub() {
      this.name = expected;
    }

    const descriptor = grpcStub(
      {},
      grpcStub.LightningStub,
      WalletUnlockerCustomStub
    ).loadPackageDefinition();
    const instance = createWalletUnlocker(descriptor, 'localhost:1', {});
    equal(instance.name, expected, 'proxy forwards to target props');
  });

  it('should allow setting on proxy target', () => {
    const expected = 'test';
    const descriptor = grpcStub().loadPackageDefinition();
    const instance = createWalletUnlocker(descriptor, 'localhost:1', {});

    instance.name = expected;
    equal(instance.name, expected, 'proxy sets target properties');
  });

  it('should provide promisified target methods', async () => {
    const expected = 'test';

    /**
     * Custom WalletUnlockerStub
     * @constructor
     */
    function WalletUnlockerCustomStub() {}
    WalletUnlockerCustomStub.prototype.initWallet = (_, cb) => {
      cb(null, expected);
    };
    const descriptor = grpcStub(
      {},
      grpcStub.LightningStub,
      WalletUnlockerCustomStub
    ).loadPackageDefinition();
    const instance = createWalletUnlocker(descriptor, 'localhost:1', {});

    const actual = await instance.initWallet({});
    equal(actual, expected, 'promisified `initWallet` target method');
  });
});
