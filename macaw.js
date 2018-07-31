function Macaw( name ) {
  this.name = name;
  this.config = {
    userName: 'sa',
    password: 'Pa$$w0rd',
    server:   'localhost',
    options: {
      database: 'macaws',
      encrypt:  true
    }
  };
  this.Connection = null;
  this.cnn        = null;
  this.chat_type  = null;
  this.socketio   = null;
}

Macaw.prototype = {
  init: function( chat_type, socketio ) {
    this.chat_type = chat_type;
    this.socketio  = socketio;
    this.Connection = require( 'tedious' ).Connection;
    this.cnn        = new this.Connection( this.config );

    this.cnn.on ( 'connect', (function( err ) {
      if ( err ) console.log( err );
        else {
        //console.log( 'connected' );
        this.selectMacaws();
      }
    }).bind( this ) );

    this.cnn.on ( 'end', function( err ) {
      //console.log( 'disconnected' );
    } );
  },

  selectMacaws: function() {
    var Request = require( 'tedious' ).Request;
    var req = new Request( "SELECT mac_name, url, action FROM macaws", function( err ) {
      if ( err ) console.log( err );
    } );

    var result  = {};
    var content = [];
    var content2 = "";
    this.cnn.execSql( req );

    var r = null;
    req.on( 'row', function( columns ) {
      r = "";
      if ( content2 != "" ) content2 += ",";
      content2 += "{";
      columns.forEach( function( column ) {
        if ( column.value == null ) {
          console.log( 'NULL' );
        } else {
          result[ column.metadata.colName ] = column.value;
          if ( r != "" ) r += ",";
          r += "'" + column.metadata.colName + "':'" + column.value + "'"
        }
        content.push( result );
        result = {};
      } );
      content2 += r + "}";
    } );

    req.on( 'requestCompleted', ( function() {
      //console.log( 'requestCompleted' );
      console.log( content2 );
      this.socketio.emit( this.chat_type, "[" + content2 + "]" );
      this.cnn.close();
    } ).bind( this ) );

  },

  toString: function() {
    return "name:" + this.name;
  }
};

module.exports = Macaw;

