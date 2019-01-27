function cMacawJSON() {
  this.url         = null;
  this.chat_type   = null;
  this.socketio    = null;
  this.payload     = null;
}

cMacawJSON.prototype = {
  select: function( url, fs, chat_type, socketio ) {
    this.url         = url;
    this.chat_type   = chat_type;
    this.socketio    = socketio;

    console.log( 'connected successfully to server.' );
    var docs = JSON.parse( fs.readFileSync( this.url, 'utf8' ));
    console.log( 'docs:' + docs );
    if ( this.socketio != null ) {
      this.socketio.broadcast.emit( this.chat_type, docs );
      this.socketio.emit( this.chat_type, docs );
    }
  },
  insert: function( chat_type, socketio ) {
  },
  purge: function( chat_type, socketio ) {
  },
  history: function( chat_type, socketio ) {
  }
};

// var macawJson = new cMacawJSON();
// macawJson.select( './macaw.json' );
// macawJson.select( './macaw.json' );

module.exports = cMacawJSON;

