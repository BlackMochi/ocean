const afinn = require('../afinn/th')
const Sentiment = require('./_aho.js')
const negators = { ไม่: 1 }
const sentiment = new Sentiment({ afinn, negators })
module.exports = phrase => sentiment.analyse(phrase)
