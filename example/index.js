var level = require('../')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db = level('some-table-name', {
  // level options
  valueEncoding: 'json',
  // required DynamoDB options
  dynamo: {
    region: 'us-east-1',
    secretAccessKey: 'abc',
    accessKeyId: '123',
    // optional desired throughput (first run/create only)
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    httpOptions: {
      proxy: 'http://localhost:8000'
    }
  }
})

// 2) put a key & value
db.put('name', 'Level', function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error

  // 3) fetch by key
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found

    // ta da!
    console.log('name=' + value)
  })
})
