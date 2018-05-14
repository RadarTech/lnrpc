const assert = require('assert');
const createLnrpc = require('../index');
const grpcStub = require('./helpers/grpc-stub');
const {LightningStub} = grpcStub;

const {equal} = assert;

describe('Release API', () => {
  it('should expose a lnrpc factory function as default', () => {
    equal(typeof createLnrpc, 'function');
  });

  it('should create instance exposing top-level lighting methods', () => {
    /**
     * Custom LightningCustomStub
     * @constructor
     */
    function LightningCustomStub() {}
    LightningCustomStub.prototype.walletBalance = () => {};

    return createLnrpc({
      grpc: grpcStub({}, LightningCustomStub),
    }).then((lnrpc) => {
      equal(typeof lnrpc.walletBalance, 'function');
    });
  });

  it('should provide walletUnlocker methods', () => {
    /**
     * Custom WalletUnlockerStub
     * @constructor
     */
    function WalletUnlockerStub() {}
    WalletUnlockerStub.prototype.initWallet = () => {};

    return createLnrpc({
      grpc: grpcStub({}, LightningStub, WalletUnlockerStub),
    }).then((lnrpc) => {
      equal(typeof lnrpc.walletUnlocker.initWallet, 'function');
    });
  });
});
