const { describe, it } = require('mocha')
const assert = require('assert')

const sentiment = require('..')

describe('## spanish', () => {
  it('negative', async () => {
    const { score, words } = await sentiment('Las investigaciones sugieren que quemar carbón es malo para el medio ambiente.')
    assert.equal(score, -3)
    assert.equal(words.length, 1)
  })

  it('positive', async () => {
    const { score, words } = await sentiment('Mi mejor amigo siempre me da buen consejo.')
    assert.equal(score, 2)
    assert.equal(words.length, 1)
  })
})
