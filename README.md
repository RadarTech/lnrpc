## LNRPC

Maintained fork of [lnrpc](https://github.com/Matt-Jensen/lnrpc) adding support for generating typescript type definitions.

### Features
- Auto-generates [lnd/lnrpc](https://github.com/lightningnetwork/lnd/tree/master/lnrpc) client and typescript definitons based on target release tag
- Wraps requests in promises
- Easily setup SSL and Macaroons
- Instantiates all gRPC services
- uint64/int64 types cast to string

### Installation
```sh
yarn add @radartech/lnrpc
```

Install [lnd](https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md) before using this project and ensure you have an lnd instance running with `--no-macaroons`, unless you provide macaroon authentication to your lnrpc instance when created.

### Change LND gRPC release version
To change the gRPC definitions used for all auto-generated types and RPC methods edit the `config.lnd_release_tag` value in `package.json` to the desired [LND release tag](https://github.com/lightningnetwork/lnd/releases) and run the following:

```sh
yarn generate
```
Newly generated type definitions will be available in `./generated`.

### Usage

Connecting to an lnd instance at `localhost:10001`.

```typescript
import createLnRpc, { WalletBalanceRespone } from '@radartech/lnrpc';

(async function() {
  const lnRpcClient = await createLnRpc();

  // All requests are promisified and typed
  const balanceResponse: WalletBalanceResponse.AsObject = await lnrpc.walletBalance({});

  // ...and you're off!
  console.log(balanceResponse.confirmedBalance);
})();
```

### Options

```typescript
import createLnRpc from '@radartech/lnrpc';

(async function() {
  const lnRcpCustom = await createLnRpc({
    /*
     By default lnrpc connects to `localhost:10001`,
     however we can point to any host.
     */
    server: '173.239.209.2:3001',

    /*
     By default  lnrpc looks for your tls certificate at:
     `~/.lnd/tls.cert`, unless it detects you're using macOS and
     defaults to `~/Library/Application\ Support/Lnd/tls.cert`
     however you can configure your own SSL certificate path like:
     */
    tls: './path/to/tls.cert',

    /*
     You can also provide a TLS certificate directly as a string
     (Just make sure you don't commit this to git).
     Overwrites: `tls`
     */
    cert: process.env.MY_SSL_CERT,

    /*
     Optional path to configure macaroon authentication
     from LND generated macaroon file.
     */
    macaroonPath: './path/to/data/admin.macaroon',

    /*
     Optional way to configure macaroon authentication by
     passing a hex encoded string of your macaroon file
     */
    macaroon: process.env.MY_MACAROON_HEX,
  });
})();
```

### API Reference

[All lnrpc methods documentation can be found here](http://api.lightning.community).

### Contributors

To develop on the project please run:

```sh
git clone git@github.com:RadarTech/lnrpc.git && cd $_
yarn
yarn start
```

### License

This project is licensed under the MIT License.
