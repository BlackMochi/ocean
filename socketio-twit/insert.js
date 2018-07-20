var Twit = require('twit')
const sentimental = require('@zanroo/sentimental')
var mergeJSON = require("merge-json")
//var io = require('socket.io');
var T = new Twit({
    consumer_key: 'GGdvt0PxwSuxDbvMefX9RnsYr',
    consumer_secret: 'o7PgMzlgYDoL7HNzq14ZBwX4DjApUPTYTdKz6PU2o1Hm9EnoCr',
    access_token: '889569959516356609-e3ca84es7VtgwNptiK8GQ0bs3IqmGqS',
    access_token_secret: 'YUql1VcMXx5j5PlRJUU43PVKDFyrbBzoMEU3x1KBqJ6qC',
    timeout_ms: 60 * 1000,
})

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:30001/twitter";

var stream = T.stream('statuses/filter', { track: 'elon musk' })

const socket = require('socket.io-client')('http://localhost:8081')

socket.on('connect', () => {
    console.log('connect')
})

socket.on('disconnect', () => {
    console.log('disconnect')
})

async function start () {
    try {
        const db = await MongoClient.connect(url, { useNewUrlParser: true })
        const twitdb = db.db('twitter')
        stream.on('tweet', async function (tweet) {
            try {
                let sentiment = await sentimental(tweet.text)
		        let message = mergeJSON.merge(tweet, sentiment)
                await twitdb.collection("messages").insertOne(message)
                socket.emit('msg', message)
		        console.log('message: ', message)
            } 
            catch (err) {
                console.error(err)
                throw err
            }
        })
    }
    catch (error) {
        console.error(error)
        throw error
    }
    
}
start().then(() => console.log('Start stream...'))
