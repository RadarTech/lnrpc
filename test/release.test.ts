import assert from 'assert';
import createLnRpc from '../src';
import { grpcStub, LightningStub } from './helpers/grpc-stub';

const { equal } = assert;

describe('Release API', () => {
  const certStub = 'cert';

  it('should expose a lnrpc factory function as default', () => {
    equal(typeof createLnRpc, 'function');
  });

  it('should create instance exposing top-level lighting methods', () => {
    /**
     * Custom LightningCustomStub
     * @constructor
     */
    function LightningCustomStub() { /* noop */ }
    LightningCustomStub.prototype.walletBalance = () => { /* noop */ };

    return createLnRpc({
      grpc: grpcStub({}, LightningCustomStub),
      cert: certStub,
    }).then((lnrpc) => {
      equal(typeof lnrpc.walletBalance, 'function');
    });
  });

  it('should provide walletUnlocker methods', () => {
    /**
     * Custom WalletUnlockerStub
     * @constructor
     */
    function WalletUnlockerStub() { /* noop */ }
    WalletUnlockerStub.prototype.initWallet = () => { /* noop */ };

    return createLnRpc<{ walletUnlocker: { initWallet: () => void } }>({
      grpc: grpcStub({}, LightningStub, WalletUnlockerStub),
      cert: certStub,
    }).then((lnrpc) => {
      equal(typeof lnrpc.walletUnlocker.initWallet, 'function');
    });
  });
});
