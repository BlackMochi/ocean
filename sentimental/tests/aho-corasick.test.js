const assert = require('assert')
const { describe, it } = require('mocha')

const AhoCorasick = require('../aho-corasick')

describe('AhoCorasick', () => {
  it('search after build', () => {
    const ac = new AhoCorasick()
    ac.add('123')
    ac.add('321')
    ac.build()
    var res = ac.search('12321')
    assert.deepEqual(res, ['123', '321'])
  })

  it('search before build', () => {
    const ac = new AhoCorasick()
    ac.add('123')
    ac.add('321')
    assert.throws(() => {
      ac.search('12321')
    })
  })

  it('search vitamin issue', () => {
    const ac = new AhoCorasick()
    ac.add('vitamin')
    ac.add('vitamin b')
    ac.add(' vitamin b12')
    ac.build()
    var res = ac.search(' vitamin b vitamin c')
    assert.deepEqual(res, ['vitamin', 'vitamin b', 'vitamin'])
  })
})
