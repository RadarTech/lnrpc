import os from 'os';

const homeDir = os.homedir();

// RPC client shared default values
export const defaults = {
  server: 'localhost:10001',
  macaroonPath: '',
  certEncoding: 'utf8',
  tls: /^darwin/.test(process.platform) // is macOS?
    ? `${homeDir}/Library/Application Support/Lnd/tls.cert`
    : `${homeDir}/.lnd/tls.cert`,
};
