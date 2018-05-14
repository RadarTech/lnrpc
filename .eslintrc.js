module.exports = {
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: '2017',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    codeFrame: false,
  },
  globals: {
    __dirname: true,
    Proxy: true,
    Promise: true,
    Buffer: true,
    require: true,
    module: true,
    process: true,
    Reflect: true,
  },
};
