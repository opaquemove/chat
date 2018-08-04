function cMacaw2() {
  this.mongodb     = null;
  this.MongoClient = null;
  this.url         = null;
  this.dbname      = null;
  this.cname       = null;
  this.chat_type   = null;
  this.socketio    = null;
  this.payload     = null;
}

cMacaw2.prototype = {
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
        if ( this.socketio != null ) this.socketio.emit( this.chat_type, docs );
      } ).bind( this ) );
      client.close();
    }).bind( this ) );
  },
  insert: function( url, dbname, cname , chat_type, socketio, payload ) {
    this.url       = url;
    this.dbname    = dbname;
    this.cname     = cname;
    this.chat_type = chat_type;
    this.socketio  = socketio;
    this.payload   = payload;
    this.mongodb = require('mongodb');
    this.MongoClient = this.mongodb.MongoClient;

    this.MongoClient.connect( this.url, {useNewUrlParser:true}, (function( err, client ) {
      console.log( 'connected successfully to server.' );
      const db = client.db( this.dbname );
      var col = db.collection( this.cname );
      col.insertOne( this.payload, ( function( err, result ) {
        console.log( 'result:' + result );
        console.log( 'err:' + err );
        if ( this.socketio != null ) this.socketio.emit( this.chat_type, docs );
      } ).bind( this ) );
      client.close();
    }).bind( this ) );
  }
};

// var macaw2 = new cMacaw2();
// macaw2.init( 'mongodb://127.0.0.1:27017', 'macaws', 'macaws', 'hoge', null );
// macaw2.insert( 'mongodb://127.0.0.1:27017', 'macaws', 'macaws', 'hoge', null, {"mac_name":"scarlet"} );

module.exports = cMacaw2;

