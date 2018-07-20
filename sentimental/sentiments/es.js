const afinn = require('../afinn/es')
const Sentiment = require('./_token.js')
const negators = {}
const sentiment = new Sentiment({ afinn, negators })
module.exports = phrase => sentiment.analyse(phrase)
