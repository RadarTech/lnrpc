const fs = require('fs');
const os = require('os');

/**
 * Read the generated lnrpc types and remove
 * 'List' from all Array type names.
 * More info:
 * https://github.com/improbable-eng/ts-protoc-gen/issues/86
 * https://github.com/protocolbuffers/protobuf/issues/4518
 */

const file = 'types/generated/rpc_pb.d.ts';
const tempFile = 'types/generated/rpc_pb_temp.d.ts';

const reader = require('readline').createInterface({
  input: fs.createReadStream(file),
});
const writer = fs.createWriteStream(tempFile, {
  flags: 'a',
});

reader.on('line', (line) => {
  if (/List.*Array<.*>,/.test(line)) {
    writer.write(line.replace('List', ''));
  } else {
    writer.write(line);
  }
  writer.write(os.EOL);
});

reader.on('close', () => {
  writer.end();

  fs.renameSync(tempFile, file);
});
