/**
 * Lightning RPC Stub
 * @constructor
 */
const LightningStub = function LightningStub() {};

/**
 * Wallet Unlocker RPC Stub
 * @constructor
 */
const WalletUnlockerStub = function WalletUnlockerStub() {};

/**
 * Metadata
 * @constructor
 */
function Metadata() {}
Metadata.prototype.add = () => {};

/**
 * Create a grpc stub
 * @param  {Object?}              options
 * @param  {LightningStub?}       lightning
 * @param  {WalletUnlockerStub?}  walletUnlocker
 * @return {Object}
 */
module.exports = function grpcStub(
  options = {},
  lightning = LightningStub,
  walletUnlocker = WalletUnlockerStub
) {
  return Object.assign(
    {
      Metadata,
      credentials: {
        createSsl: () => ({}),
        createFromMetadataGenerator: (cb) => {
          cb({}, () => {});
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
    options
  );
};

module.exports.LightningStub = LightningStub;
module.exports.WalletUnlockerStub = WalletUnlockerStub;
