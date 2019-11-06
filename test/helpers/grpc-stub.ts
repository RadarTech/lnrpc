/**
 * Lightning RPC Stub
 * @constructor
 */
export const LightningStub = () => { /* noop */ };

/**
 * Wallet Unlocker RPC Stub
 * @constructor
 */
export const WalletUnlockerStub = () => { /* noop */ };

/**
 * Chain Notifier RPC Stub
 * @constructor
 */
export const ChainNotifierStub = () => { /* noop */ };

/**
 * Metadata
 * @constructor
 */
function Metadata() { /* noop */ }
Metadata.prototype.add = () => { /* noop */ };

/**
 * Create a grpc stub
 * @param  {Object?}              options
 * @param  {LightningStub?}       lightning
 * @param  {WalletUnlockerStub?}  walletUnlocker
 * @param  {ChainNotifierStub?}   chainNotifier
 * @return {Object}
 */
export function grpcStub(
  options = {},
  lightning: (value?: unknown) => void = LightningStub,
  walletUnlocker: (value?: unknown) => void = WalletUnlockerStub,
  chainNotifier: (value?: unknown) => void = ChainNotifierStub,
) {
  return Object.assign(
    {
      Metadata,
      credentials: {
        createSsl: () => ({}),
        createFromMetadataGenerator: (cb) => {
          cb({}, () => { /* noop */ });
          return {};
        },
        combineChannelCredentials: () => ({}),
      },
      loadPackageDefinition: () => ({
        lnrpc: {
          Lightning: lightning,
          WalletUnlocker: walletUnlocker,
          ChainNotifier: chainNotifier,
        },
      }),
    },
    options,
  );
}
