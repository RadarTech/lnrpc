const fs = require('fs');
const assert = require('assert');
const pkgDir = require('pkg-dir');
const {join} = require('path');
const {promisify} = require('util');
const os = require('os');

const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

describe('Install', () => {
  before(async () => {
    const isMac = /^darwin/.test(process.platform);
    const certDir = join(
      os.homedir(),
      isMac ? 'Library/Application Support/Lnd' : '.lnd'
    );
    const certFile = join(certDir, 'tls.cert');

    /*
     Ensure SSL cert dir exits
     */
    try {
      await stat(certDir);
    } catch (e) {
      await mkdir(certDir);
    }

    /*
     Ensure SSL cert file exists
     */
    try {
      await stat(certFile);
    } catch (e) {
      await writeFile(certFile, '--test-cert--');
    }
  });

  it('should generate lnd dir under `node_modules/lnd`', async () => {
    const root = await pkgDir(__dirname);

    return stat(join(root, 'node_modules/lnd'))
      .then(() => assert(true, '`node_modules/lnd` exists'))
      .catch((e) => assert.fail('`node_modules/lnd` was not installed'));
  });

  it('should have a lnd/lnrpc/rpc.proto file', async () => {
    const root = await pkgDir(__dirname);

    return stat(join(root, 'node_modules/lnd/lnrpc/rpc.proto'))
      .then((stats) =>
        assert(stats.isFile(), '`node_modules/lnd/lnrpc/rpc.proto` exists')
      )
      .catch((e) =>
        assert.fail('`node_modules/lnd/lnrpc/rpc.proto` was not installed')
      );
  });
});
