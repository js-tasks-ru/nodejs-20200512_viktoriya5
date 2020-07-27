const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.setEncoding(options.defaultEncoding);
    this.bufferSize = 0;
    this.limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.bufferSize += Buffer.byteLength(chunk, encoding);
    if (this.bufferSize > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
