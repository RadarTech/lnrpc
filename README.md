## @radar/lnrpc

[![CircleCI](https://img.shields.io/circleci/project/github/RadarTech/lnrpc/master.svg?style=flat)](https://circleci.com/gh/RadarTech/lnrpc)
[![Known Vulnerabilities](https://snyk.io/test/github/RadarTech/lnrpc/badge.svg?targetFile=package.json)](https://snyk.io/test/github/RadarTech/lnrpc?targetFile=package.json)
[![NPM Version](https://img.shields.io/npm/v/@radar/lnrpc.svg?style=flat)](https://www.npmjs.com/package/@radar/lnrpc)
[![License](https://img.shields.io/github/license/radartech/lnrpc.svg?style=flat)](https://img.shields.io/github/license/radartech/lnrpc.svg?style=flat)

A Typescript gRPC client for LND with support for all LND sub-servers. Originally forked from [Matt-Jensen/lnrpc](https://github.com/Matt-Jensen/lnrpc).

### Features
- Auto-generates [lnd/lnrpc](https://github.com/lightningnetwork/lnd/tree/master/lnrpc) clients and Typescript type definitions using a target release tag
- Supports all LND sub-servers
- Wraps requests in promises
- Easily setup SSL and Macaroons
- Instantiates all gRPC services
- uint64/int64 types cast to string to prevent precision loss

### Installation
```sh
npm install @radar/lnrpc
# OR
yarn add @radar/lnrpc
```

**Notes:**
  - Ensure you have an lnd instance running with `--no-macaroons`, unless you provide macaroon authentication to your lnrpc instance when created.
  - If you want to interact with the LND sub-servers, ensure that LND was compiled with the necessary sub-server build tags.
  - If the following error is thrown in the consuming application, run `npm rebuild`:
    ```
    Error: Failed to load gRPC binary module because it was not installed for the current system
    ```

### Usage

This package exports a create function for the main gRPC server as well as each sub-server:

```typescript
import {
  createAutopilotRpc,
  createChainRpc,
  createInvoicesRpc,
  createLnRpc,
  createRouterRpc,
  createSignRpc,
  createWalletRpc,
  createWatchtowerRpc,
  createWtClientRpc,
} from '@radar/lnrpc';
```

You can also import the create function for the main gRPC server using the default import:

```typescript
import createLnRpc from '@radar/lnrpc';
```

If you want to interact with all servers, wrap the functions in a class or object for easy initialization:

```typescript
import createLnRpc, {
  AutopilotRpc,
  ChainRpc,
  createAutopilotRpc,
  createChainRpc,
  createInvoicesRpc,
  createRouterRpc,
  createSignRpc,
  createWalletRpc,
  createWatchtowerRpc,
  createWtClientRpc,
  InvoicesRpc,
  LnRpc,
  RouterRpc,
  RpcClientConfig,
  SignRpc,
  WalletRpc,
  WatchtowerRpc,
  WtClientRpc,
} from '@radar/lnrpc';

export class Lightning {
  public static lnrpc: LnRpc;
  public static autopilotrpc: AutopilotRpc;
  public static chainrpc: ChainRpc;
  public static invoicesrpc: InvoicesRpc;
  public static routerrpc: RouterRpc;
  public static signrpc: SignRpc;
  public static walletrpc: WalletRpc;
  public static watchtowerrpc: WatchtowerRpc;
  public static wtclientrpc: WtClientRpc;

  /**
   * Initialize gRPC clients for the main server and all sub-servers
   * @param config The RPC client connection configuration
   */
  public static async init(config: RpcClientConfig): Promise<void> {
    this.lnrpc = await createLnRpc(config);
    this.autopilotrpc = await createAutopilotRpc(config);
    this.chainrpc = await createChainRpc(config);
    this.invoicesrpc = await createInvoicesRpc(config);
    this.routerrpc = await createRouterRpc(config);
    this.signrpc = await createSignRpc(config);
    this.walletrpc = await createWalletRpc(config);
    this.watchtowerrpc = await createWatchtowerRpc(config);
    this.wtclientrpc = await createWtClientRpc(config);
  }
}
```

### Usage Example - Main Server

Connecting to an lnd instance at `localhost:10001`.

```typescript
import createLnRpc from '@radar/lnrpc';

(async () => {
  const lnRpcClient = await createLnRpc(config);

  // All requests are promisified and typed
  const { confirmedBalance } = await lnRpcClient.walletBalance();

  // ...and you're off!
  console.log(confirmedBalance);

  // subscribe to LND server events
  const subscriber = await lnRpcClient.subscribeInvoices();
  subscriber.on('data', invoice => {
    console.log(invoice); // do something with invoice event
  });
})();
```

### Options Example - Main Server

```typescript
import createLnRpc from '@radar/lnrpc';

(async () => {
  const lnRpcClient = await createLnRpc({
    /*
     * By default lnrpc connects to `localhost:10001`,
     * however we can point to any host.
     */
    server: '173.239.209.2:3001',

    /*
     * By default  lnrpc looks for your tls certificate at:
     * `~/.lnd/tls.cert`, unless it detects you're using macOS and
     * defaults to `~/Library/Application\ Support/Lnd/tls.cert`
     * however you can configure your own SSL certificate path like:
     */
    tls: './path/to/tls.cert',

    /*
     * You can also provide a TLS certificate directly as a string
     * (Just make sure you don't commit this to git).
     * Overwrites: `tls`
     */
    cert: process.env.MY_SSL_CERT,

    /*
     * Optional path to configure macaroon authentication
     * from LND generated macaroon file.
     */
    macaroonPath: './path/to/data/admin.macaroon',

    /*
     * Optional way to configure macaroon authentication by
     * passing a hex encoded string of your macaroon file.
     * Encoding: `xxd -ps -u -c 1000 ./path/to/data/admin.macaroon`
     * Details: https://github.com/lightningnetwork/lnd/blob/dc3db4b/docs/macaroons.md#using-macaroons-with-grpc-clients
     */
    macaroon: process.env.MY_MACAROON_HEX,
  });

  try {
    const getInfoResponse = await lnRpcClient.getInfo();
    console.log(getInfoResponse);
  } catch (error) {
    console.error(error);
  }
})();
```

### API Reference

[All main server (lnrpc) methods documentation can be found here](http://api.lightning.community).

### Usage With BTCPayServer

By default lnrpc assumes SSl certificate pinning.
In order to use lnrpc with a service (like BTCPayServer) which manages your certification,
you'll have to opt to disable certificate pinning by passing `{ tls: false }` within your lnrpc configuration.

### Contributing

#### Clone Repository & Install Dependencies
```sh
git clone git@github.com:RadarTech/lnrpc.git && cd $_

npm install
# OR
yarn
```

#### Change LND gRPC release version
To change the gRPC definitions used for all auto-generated types and RPC methods edit the `config.lnd_release_tag` value in `package.json` to the desired [LND release tag](https://github.com/lightningnetwork/lnd/releases) and run the following:

```sh
npm run update-protos
# OR
yarn update-protos

# AND

npm run generate
# OR
yarn generate
```
Newly generated type definitions will be available in `./generated`.
You can now delete the old proto file inside the lnd directory.
Use the generated type definitions to update the types in `src/types/rpc`.
Any added streaming methods must be included in the `subscriptionMethods` array that's into the `createServiceClient` function.
This prevents streaming methods from being promisified.

### License

This project is licensed under the MIT License.
