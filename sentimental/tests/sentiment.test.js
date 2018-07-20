const { describe, it } = require('mocha')
const assert = require('assert')

const sentiment = require('..')

describe('## sentiment', () => {
  it('multiple language', async () => {
    const result = await sentiment('Hey you worthless scumbag โคตรโง่')
    assert.equal(result.score, -9)
  })

  it('handle:- Failed to identify language', async () => {
    const result = await sentiment('fsd odfi gsdfi')
    assert.equal(result.score, 0)
    assert.equal(result.languages, 0)
  })
})
