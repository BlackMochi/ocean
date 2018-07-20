const cld = require('cld')
const Promise = require('bluebird')
const { map, union, compact } = require('lodash')
const fs = require('fs')

cld.detect = Promise.promisify(cld.detect)

const sentiments = {}
const filenames = fs.readdirSync(`${__dirname}/sentiments/`)
for (let i = 0; i < filenames.length; i++) {
  const filename = filenames[i]
  if (filename.indexOf('_')) {
    const sentiment = require(`${__dirname}/sentiments/${filenames[i]}`)
    const name = filename.replace('.js', '')
    sentiments[name] = sentiment
  }
}

module.exports = async phrase => {
  let detected = []
  try {
    detected = await cld.detect(phrase)
  } catch (err) {}

  const languages = map(detected.languages, 'code')

  const result = {
    phrase,
    languages,
    score: 0,
    words: [],
    positive: [],
    negative: []
  }
  for (let i = 0; i < languages.length; i++) {
    const code = languages[i]
    const sentiment = sentiments[code]
    if (sentiment !== undefined) {
      let { score, words, positive, negative } = sentiment(phrase)
      words = compact(words)
      result.score += score
      result.words = union(result.words, words)
      result.positive = union(result.positive, positive)
      result.negative = union(result.negative, negative)
    }
  }

  return result
}
