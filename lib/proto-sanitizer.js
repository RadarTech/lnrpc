const fs = require('fs');
const os = require('os');

/**
 * The intended use of this program is to
 * to read a target proto file and sanitize it
 * before typescript definitions are generated.
 * ie. uint64 values can overflow Number types
 * --> add a tag jstype = JS_STRING to cast to string
 */

if (!(process.argv[2] && process.argv[3])) {
  throw new Error('Usage: node lib/proto-sanitizer.js' +
    './file.proto ./file.sanitized.proto');
}
const readFile = process.argv[2];
const writeFile = process.argv[3];

const reader = require('readline').createInterface({
  input: fs.createReadStream(readFile),
});
const writer = fs.createWriteStream(writeFile, {
  flags: 'a',
});

const payload = 'jstype = JS_STRING';
reader.on('line', (line) => {
  if (/^\s*u?int64.*$/.test(line)) {
    if (/^.*];$/.test(line)) { // existing tag
      writer.write(line.replace(/\s*];$/, `, ${payload}];`));
    } else {
      writer.write(line.replace(/;$/, ` [${payload}];`));
    }
  } else {
    writer.write(line);
  }
  writer.write(os.EOL);
});

reader.on('close', () => {
  writer.end();
});
