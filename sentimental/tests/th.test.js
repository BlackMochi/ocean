const { describe, it } = require('mocha')
const assert = require('assert')

const sentiment = require('..')

describe('## thai', () => {
  it('negative', async () => {
    const { score, words } = await sentiment('หนังไม่สนุก')
    assert.equal(score, -3)
    assert.equal(words.length, 2)
  })

  it('positive', async () => {
    const { score, words } = await sentiment('หนังสนุก')
    assert.equal(score, 3)
    assert.equal(words.length, 1)
  })

  it('neutral by negator', async () => {
    const { score, words } = await sentiment('ภาคแรกสนุก แต่สองไม่สนุก')
    assert.equal(score, 0)
    assert.equal(words.length, 2)
  })
})
