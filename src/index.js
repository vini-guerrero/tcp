const Transform = require('stream').Transform
const GdComUtils = require('@gd-com/utils')

class StreamTcp extends Transform {
  _transform (chunk, enc, done) {
    let buffer = chunk
    while (buffer.length > 0) {
      const length = buffer.readUInt16LE(0)

      const bufferSplitted = buffer.slice(4, length + 4) // 4 cause the length bytes is in buffer
      buffer = buffer.slice(length + 4, buffer.length) // 4 cause the length bytes is in buffer

      this.push(bufferSplitted)
    }
    done()
  }
}

class GdBufferTcp extends GdComUtils.GdBuffer {
  // add 4 bytes on head
  getBuffer () {
    if (this._buffer.length > 0) {
      let lengthBuffer = Buffer.alloc(4)
      lengthBuffer.writeUInt32LE(this._buffer.length, 0)
      return Buffer.concat([lengthBuffer, this._buffer])
    }
    return Buffer.alloc(0)
  }
}

module.exports = {
  StreamTcp,
  GdBufferTcp,
  ...GdComUtils
}
