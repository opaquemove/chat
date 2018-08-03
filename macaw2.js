function Macaw2() {
  this.mongodb     = null;
  this.MongoClient = null;
  this.url         = null;
  this.dbname      = null;
  this.cname       = null;
  this.chat_type   = null;
  this.socketio    = null;
}

Macaw2.prototype = {
  init: function( url, dbname, cname , chat_type, socketio ) {
    this.url       = url;
    this.dbname    = dbname;
    this.cname     = cname;
    this.chat_type = chat_type;
    this.socketio  = socketio;
    this.mongodb = require('mongodb');
    this.MongoClient = this.mongodb.MongoClient;

    this.MongoClient.connect( this.url, {useNewUrlParser:true}, (function( err, client ) {
      console.log( 'connected successfully to server.' );
      const db = client.db( this.dbname );
      var col = db.collection( this.cname );
      col.find({}).toArray( ( function( err, docs ) {
        console.log( docs );
        //this.socketio.emit( this.chat_type, docs );
      } ).bind( this ) );
      client.close();
    }).bind( this ) );

  }
};

// var macaw2 = new Macaw2();
// macaw2.init( 'mongodb://127.0.0.1:27017', 'macaws', 'macaws' );

module.exports = Macaw2;

