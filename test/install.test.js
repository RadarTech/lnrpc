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

  const targetLndDir =
    `node_modules/lnd#${process.env.npm_package_config_lnd_release_tag}`;

  it('should generate lnd dir under `node_modules/lnd`', async () => {
    const root = await pkgDir(__dirname);

    return stat(join(root, targetLndDir))
      .then(() => assert(true, `${targetLndDir} exists`))
      .catch((e) => assert.fail(`${targetLndDir} was not installed`));
  });

  it('should have a lnd/lnrpc/rpc.proto file', async () => {
    const root = await pkgDir(__dirname);

    return stat(join(root, `${targetLndDir}/lnrpc/rpc.proto`))
      .then((stats) =>
        assert(stats.isFile(), `${targetLndDir}/lnrpc/rpc.proto exists`)
      )
      .catch((e) =>
        assert.fail(`${targetLndDir}/lnrpc/rpc.proto was not installed`)
      );
  });
});
