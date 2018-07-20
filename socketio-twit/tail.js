const MongoOplog = require('mongo-oplog')
const oplog = MongoOplog('mongodb://127.0.0.1:30001/local', { ns: 'twitter.messages' })
const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
})

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

async function save(doc) {
  let id = doc._id.toString()
  delete doc._id
  return await client.create({
    index: 'twitter',
    type: 'messages',
    id: id,
    body: doc
  });
}

oplog.tail();

oplog.on('op', data => {
  console.log(":)");
});

oplog.on('insert', async (doc) => {
    console.log(doc);
    let result = await save(doc.o)
    //console.log(result)
});

oplog.on('update', doc => {
  console.log(doc);
});

oplog.on('delete', doc => {
  console.log(doc.o._id);
});

oplog.on('error', error => {
  console.log(error);
});

oplog.on('end', () => {
  console.log('Stream ended');
});

//oplog.stop(() => {
//  console.log('server stopped');
//});
