const chai = require('chai')
const GdCom = require('../src')

const expect = chai.expect

describe('gd-com GdBuffer', () => {
  it(`should encode/decode string and be empty`, () => {
    let buffer = new GdCom.GdBufferTcp()

    const values = ['test', 'test1', 'test2']

    return values.reduce((promise, value) => {
      return promise
        .then(() => buffer.putVar(value))
        .then(() => buffer.getVar())
        .then((test) => {
          expect(test).to.be.equal(value)
          expect(buffer.getBuffer()).to.be.deep.equals(Buffer.alloc(0))
        })
    }, Promise.resolve())
  })

  it(`should encode/decode integer and be empty`, () => {
    let buffer = new GdCom.GdBufferTcp()

    const values = [-100, 100, 500, 8520]

    return values.reduce((promise, value) => {
      return promise
        .then(() => buffer.putVar(value))
        .then(() => buffer.getVar())
        .then((test) => {
          expect(test).to.be.equal(value)
          expect(buffer.getBuffer()).to.be.deep.equals(Buffer.alloc(0))
        })
    }, Promise.resolve())
  })

  it(`should encode/decode float and be empty`, () => {
    let buffer = new GdCom.GdBufferTcp()

    const values = [-100, 100, 500, 8520]

    return values.reduce((promise, value) => {
      return promise
        .then(() => buffer.putVar(value))
        .then(() => buffer.getVar())
        .then((test) => {
          expect(test).to.be.equal(value)
          expect(buffer.getBuffer()).to.be.deep.equals(Buffer.alloc(0))
        })
    }, Promise.resolve())
  })

  it(`should encode/decode and contains test4 + 4 bytes length `, async () => {
    let buffer = new GdCom.GdBufferTcp()

    await buffer.putVar('test1')
    await buffer.putVar('test2')
    await buffer.putVar('test3')
    await buffer.putVar('test4')

    let test = await buffer.getVar()
    expect(test).to.be.equal('test1')
    expect(buffer.getBuffer().length).to.be.equals(4 + 48)

    test = await buffer.getVar()
    expect(test).to.be.equal('test2')
    expect(buffer.getBuffer().length).to.be.equals(4 + 32)

    test = await buffer.getVar()
    expect(test).to.be.equal('test3')
    expect(buffer.getBuffer().length).to.be.equals(4 + 16)
  })
})
