[![Build Status](https://travis-ci.org/Matt-Jensen/lnrpc.svg?branch=master)](https://travis-ci.org/Matt-Jensen/lnrpc)

## LNRPC

Latest synced to `lnd@v0.4.*-beta`.

Generates a Lightning Network RPC client directly from [github.com/lightningnetwork/lnd](https://github.com/lightningnetwork/lnd). Lnrpc is versioned in step with lnd, please see release branches: `release/v*.*.*`;

### Installation

```sh
yarn add lnrpc

# Or
npm i lnrpc -S
```

For best results, be sure to [install lnd](https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md) before using this project and ensure you have an lnd instance running with `--no-macaroons`.

### Usage

Connecting to an lnd instance at `localhost:10001`.

```javascript
const createLnrpc = require('lnrpc');

(async function() {
  const lnrpc = await createLnrpc();

  // All requests are promisified
  const balance = await lnrpc.walletBalance({});

  // ...and you're off!
  console.log(balance);
})();
```

### Options

```javascript
const createLnrpc = require('lnrpc');

(async function() {
  const lnrcpCustom = await createLnrpc({
    /*
     By default lnrpc connects to `localhost:10001`,
     however we can point to any host.
     */
    server: '173.239.209.2:3001',

    /*
     By default  lnrpc looks for your tls certificate at:
     `~/.lnd/lnd.conf`, unless it detects you're using macOS and
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
  });
})();
```

### API Reference

[All lnrpc methods documentation can be found here](http://api.lightning.community).

### Contributors

To develop on the project please run:

```sh
git clone git@github.com:Matt-Jensen/lnrpc.git && cd $_
yarn
npm run start
```

### License

This project is licensed under the MIT License.
