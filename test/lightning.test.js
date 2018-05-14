const assert = require('assert');
const createLightning = require('../lib/lightning');
const grpcStub = require('./helpers/grpc-stub');
const {equal} = assert;

const {stringify} = JSON;

describe('Lightning Service', () => {
  it('should not modify arguments', () => {
    const descriptor = grpcStub().load();
    const expDescriptor = stringify(descriptor);
    const server = 'localhost:10003';
    const expServer = `${server}`;
    const credentials = {};
    const expCredentials = stringify(credentials);
    const config = {subscriptionMethods: ['subscribeInvoices']};
    const expConfig = stringify(config);

    createLightning(descriptor, server, credentials, config);

    equal(stringify(descriptor), expDescriptor, 'has expected descriptor');
    equal(server, expServer, 'has expected server');
    equal(stringify(credentials), expCredentials, 'has expected credentials');
    equal(stringify(config), expConfig, 'has expected config');
  });

  it('should throw when unable to create lightning service', () => {
    let expectedErr;

    try {
      /**
       * Custom LightningStub
       * @constructor
       */
      const LightningCustomStub = function() {
        throw new Error();
      };

      const descriptor = grpcStub({}, LightningCustomStub).load();
      assert.throws(
        () => createLightning(descriptor, 'localhost:1', {}),
        (e) => {
          expectedErr = e;
          return true;
        }
      );
    } catch (_) {} // eslint-disable-line

    return new Promise((resolve) => {
      equal(
        expectedErr && expectedErr.code,
        'GRPC_LIGHTNING_SERVICE_ERR',
        'has expected error'
      );
      resolve();
    });
  });

  it('should allow getting on proxy target', () => {
    const expected = 'test';

    /**
     * Custom LightningStub
     * @constructor
     */
    function LightningCustomStub() {
      this.name = expected;
    }

    const descriptor = grpcStub({}, LightningCustomStub).load();
    const instance = createLightning(descriptor, 'localhost:1', {});
    equal(instance.name, expected, 'proxy forwards to target props');
  });

  it('should allow setting on proxy target', () => {
    const expected = 'test';
    const descriptor = grpcStub().load();
    const instance = createLightning(descriptor, 'localhost:1', {});

    instance.name = expected;
    equal(instance.name, expected, 'proxy sets target properties');
  });

  it('should provide promisified target methods', async () => {
    const expected = 'test';

    /**
     * Custom LightningStub
     * @constructor
     */
    function LightningCustomStub() {}
    LightningCustomStub.prototype.getInfo = (_, cb) => {
      cb(null, expected);
    };
    const descriptor = grpcStub({}, LightningCustomStub).load();
    const instance = createLightning(descriptor, 'localhost:1', {});

    const actual = await instance.getInfo({});
    equal(actual, expected, 'promisified `getInfo` target method');
  });

  it('should forward streaming methods unmodified', () => {
    // RPC streaming response interface
    const expected = {
      on() {},
      write() {},
    };

    // Custom subscription methods
    const expSubscriptionMethods = ['stream1', 'stream2'];

    /**
     * Custom LightningStub
     * @constructor
     */
    function LightningCustomStub() {}
    LightningCustomStub.prototype.stream1 = () => expected;
    LightningCustomStub.prototype.stream2 = () => expected;

    const descriptor = grpcStub({}, LightningCustomStub).load();
    const instance = createLightning(
      descriptor,
      'localhost:1',
      {},
      {subscriptionMethods: expSubscriptionMethods}
    );

    expSubscriptionMethods.forEach((method) => {
      equal(instance[method](), expected, 'forwards original method');
    });
  });
});
