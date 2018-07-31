const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true}, ( err, client ) => {
  console.log( "connected successfuly to server." );
  const db = client.db('macaws');
  var col = db.collection('macaws');
  col.find({}).toArray( function( err, docs ) {
    console.log( docs );
  });

  client.close();
});

