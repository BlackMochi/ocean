const tokenize = require('sentiment/lib/tokenize')

class Sentiment {
  constructor ({ afinn, negators = {} }) {
    this.afinn = afinn
    this.negators = negators
  }

  analyse (phrase) {
    const tokens = tokenize(phrase)
    const words = []
    const positive = []
    const negative = []
    let score = 0

    let len = tokens.length
    while (len--) {
      const obj = tokens[len]
      let item = this.afinn[obj]
      if (!this.afinn.hasOwnProperty(obj)) continue

      if (len > 0) {
        const prevtoken = tokens[len - 1]
        if (this.negators[prevtoken]) item = -item
      }

      words.push(obj)
      if (item > 0) positive.push(obj)
      if (item < 0) negative.push(obj)

      score += item
    }

    return {
      score,
      words,
      positive,
      negative
    }
  }
}

module.exports = Sentiment
