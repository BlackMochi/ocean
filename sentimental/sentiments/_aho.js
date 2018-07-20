const { filter, uniqWith, isEqual } = require('lodash')
const uniqWithEqual = (arr) => uniqWith(arr, isEqual)

const Ahocorasick = require('../aho-corasick')

class Sentiment {
  constructor ({ afinn, negators = {} }) {
    this.afinn = afinn
    this.negators = negators
    this.ac = new Ahocorasick()
    for (const word in afinn) {
      this.ac.add(word)
    }
    this.ac.build()
  }

  analyse (phrase = '') {
    const words = this.ac.search(phrase.toLocaleLowerCase())
    const positive = []
    const negative = []
    let withNegators = []
    let score = 0

    let len = words.length
    while (len--) {
      const word = words[len]
      let item = this.afinn[word]
      if (!this.afinn.hasOwnProperty(word)) continue

      for (const negator in this.negators) {
        if (this.isWithNegator(this, words, word, negator)) {
          withNegators.push([word, negator])
        }
      }

      if (item > 0) positive.push(word)
      if (item < 0) negative.push(word)

      score += item
    }

    withNegators = uniqWithEqual(withNegators)
    for (let i = 0; i < withNegators.length; i++) {
      const [word, negator] = withNegators[i]
      const nword = negator + word
      const ncount = filter(words, w => w === nword).length
      score -= ncount * this.afinn[word]
    }

    return {
      score,
      words,
      positive,
      negative
    }
  }

  isWithNegator (sentiment, words, word, negator) {
    return sentiment.afinn[word] && ~words.indexOf(`${negator}${word}`)
  }
}

module.exports = Sentiment
