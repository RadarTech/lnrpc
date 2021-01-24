import assert, { equal } from 'assert';
import { ChannelCredentials } from '@grpc/grpc-js';
import { createWalletUnlocker } from '../../src/services';
import { grpcStub, LightningStub } from '../helpers/grpc-stub';

const { stringify } = JSON;

describe('Wallet Unlocker Service', () => {
  const credentials = {} as ChannelCredentials;

  it('should not modify arguments', () => {
    const descriptor = grpcStub().loadPackageDefinition();
    const expDescriptor = stringify(descriptor);
    const server = 'localhost:10003';
    const expServer = `${server}`;
    const expCredentials = stringify(credentials);

    createWalletUnlocker({
      grpcPkgObj: descriptor,
      server,
      credentials,
    });

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
      const WalletUnlockerCustomStub = () => {
        throw new Error();
      };

      const descriptor = grpcStub(
        {},
        LightningStub,
        WalletUnlockerCustomStub,
      ).loadPackageDefinition();

      assert.throws(
        () => createWalletUnlocker({
          grpcPkgObj: descriptor,
          server: 'localhost:1',
          credentials,
        }),
        (e) => {
          expectedErr = e;
          return true;
        },
      );
    } catch (_) {
      // noop
    }

    return new Promise((resolve) => {
      equal(
        expectedErr?.code,
        'GRPC_WALLET_UNLOCKER_SERVICE_ERR',
        'has expected error',
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
      LightningStub,
      WalletUnlockerCustomStub,
    ).loadPackageDefinition();
    const instance = createWalletUnlocker({
      grpcPkgObj: descriptor,
      server: 'localhost:1',
      credentials,
    });
    equal(instance.name, expected, 'proxy forwards to target props');
  });

  it('should allow setting on proxy target', () => {
    const expected = 'test';
    const descriptor = grpcStub().loadPackageDefinition();
    const instance = createWalletUnlocker({
      grpcPkgObj: descriptor,
      server: 'localhost:1',
      credentials,
    });

    instance.name = expected;
    equal(instance.name, expected, 'proxy sets target properties');
  });

  it('should provide promisified target methods', async () => {
    const expected = 'test';

    /**
     * Custom WalletUnlockerStub
     * @constructor
     */
    function WalletUnlockerCustomStub() {
      // noop
    }
    WalletUnlockerCustomStub.prototype.initWallet = (_, cb) => {
      cb(null, expected);
    };
    const descriptor = grpcStub(
      {},
      LightningStub,
      WalletUnlockerCustomStub,
    ).loadPackageDefinition();
    const instance = createWalletUnlocker({
      grpcPkgObj: descriptor,
      server: 'localhost:1',
      credentials,
    });

    const actual = await instance.initWallet({});
    equal(actual, expected, 'promisified `initWallet` target method');
  });
});
