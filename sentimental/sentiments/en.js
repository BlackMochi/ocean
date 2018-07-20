const afinn = require('sentiment/build/AFINN.json')
const Sentiment = require('./_token.js')
const negators = {
  'cant': 1,
  'can\'t': 1,
  'dont': 1,
  'don\'t': 1,
  'doesnt': 1,
  'doesn\'t': 1,
  'not': 1,
  'non': 1,
  'wont': 1,
  'won\'t': 1,
  'isnt': 1,
  'isn\'t': 1,
  'wasnt': 1,
  'wasn\'t': 1
}
const sentiment = new Sentiment({ afinn, negators })
module.exports = phrase => sentiment.analyse(phrase)
