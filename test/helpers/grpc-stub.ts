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
 * Autopilot RPC Stub
 * @constructor
 */
export const AutopilotStub = () => { /* noop */ };

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
 * @param  {AutopilotStub?}       autopilot
 * @param  {ChainNotifierStub?}   chainNotifier
 * @return {Object}
 */
export function grpcStub(
  options = {},
  lightning: (value?: unknown) => void = LightningStub,
  walletUnlocker: (value?: unknown) => void = WalletUnlockerStub,
  autopilot: (value?: unknown) => void = AutopilotStub,
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
        },
        autopilotrpc: {
          Autopilot: autopilot,
        },
        chainrpc: {
          ChainNotifier: chainNotifier,
        },
      }),
    },
    options,
  ) as any;
}
