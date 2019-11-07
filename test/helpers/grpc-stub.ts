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
 * Invoices RPC Stub
 * @constructor
 */
export const InvoicesStub = () => { /* noop */ };

/**
 * Router RPC Stub
 * @constructor
 */
export const RouterStub = () => { /* noop */ };

/**
 * Signer RPC Stub
 * @constructor
 */
export const SignerStub = () => { /* noop */ };

/**
 * Wallet Kit RPC Stub
 * @constructor
 */
export const WalletKitStub = () => { /* noop */ };

/**
 * Watchtower RPC Stub
 * @constructor
 */
export const WatchtowerStub = () => { /* noop */ };

/**
 * Watchtower Client RPC Stub
 * @constructor
 */
export const WatchtowerClientStub = () => { /* noop */ };

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
  invoices: (value?: unknown) => void = InvoicesStub,
  router: (value?: unknown) => void = RouterStub,
  signer: (value?: unknown) => void = SignerStub,
  walletKit: (value?: unknown) => void = WalletKitStub,
  watchtower: (value?: unknown) => void = WatchtowerStub,
  watchtowerClient: (value?: unknown) => void = WatchtowerClientStub,
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
        invoicesrpc: {
          Invoices: invoices,
        },
        routerrpc: {
          Router: router,
        },
        signrpc: {
          Signer: signer,
        },
        walletrpc: {
          WalletKit: walletKit,
        },
        watchtowerrpc: {
          Watchtower: watchtower,
        },
        wtclientrpc: {
          WatchtowerClient: watchtowerClient,
        },
      }),
    },
    options,
  ) as any;
}
