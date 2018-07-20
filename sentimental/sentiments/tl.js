const afinn = require('../afinn/tl')
const Sentiment = require('./_aho.js')
const negators = {}
const sentiment = new Sentiment({ afinn, negators })
module.exports = phrase => sentiment.analyse(phrase)
