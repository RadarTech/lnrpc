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
 * @return {Object}
 */
export function grpcStub(
  options = {},
  lightning: (value?: unknown) => void = LightningStub,
  walletUnlocker: (value?: unknown) => void = WalletUnlockerStub,
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
      }),
    },
    options,
  );
}
