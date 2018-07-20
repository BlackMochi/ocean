const { describe, it } = require('mocha')
const assert = require('assert')

const sentiment = require('..')

describe('## english', () => {
  it('negative', async () => {
    const { score, words } = await sentiment('Hey you worthless scumbag')
    assert.equal(score, -6)
    assert.equal(words.length, 2)
  })

  it('negative + emoji', async () => {
    const { score, words } = await sentiment('Hey you worthless scumbag 😦')
    assert.equal(score, -8)
    assert.equal(words.length, 3)
  })

  it('positive', async () => {
    const { score, words } = await sentiment('This is so cool')
    assert.equal(score, 1)
    assert.equal(words.length, 1)
  })

  it('positive + emoji', async () => {
    const { score, words } = await sentiment('This is so cool 😃')
    assert.equal(score, 3)
    assert.equal(words.length, 2)
  })
})
