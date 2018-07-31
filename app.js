var express= require( 'express' );
var app    = express();
var server = require( 'http' ).Server( app );
var io     = require( 'socket.io' )( server );
var Macaw   = require( './macaw.js' );
var macaw   = new Macaw( "macaw" );
var Macaw2  = require( './macaw2.js' );
var macaw2  = new Macaw2();

console.log( macaw.toString() );

/*
app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
} );
*/

app.use( '/', express.static( __dirname + '/public' ) );

io.on( 'connection', ( socket ) => {
  socket.on( 'chat', ( msg ) => {
    switch ( msg ) {
      case 'sql':
        console.log( msg );
        break;
      case 'macaw':
        macaw.init( 'macaw', io );
        break;
      case 'pause':
        socket.broadcast.emit( 'pause', msg );
        socket.emit( 'pause', msg );
        break;
      case 'stop':
        socket.broadcast.emit( 'stop', msg );
        socket.emit( 'stop', msg );
        break;
      case 'list':
        macaw.init( 'list', socket );
        break;
      case 'list2':
        macaw2.init( 'mongodb://127.0.0.1:27017', 'macaws', 'macaws', 'list2', socket );
        break;
      default:
        //io.emit( 'chat', msg );	// default is broadcast
        socket.broadcast.emit( 'chat', msg );
        socket.emit( 'chat', msg );
        break;
    }

  });
});

server.on( 'listening', () => {
  console.log( 'listening on 3000' );
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
// server.listen( 3000 );
server.listen( port, ipaddress );

/*
setInterval( function() {
  io.emit( 'chat', 'broadcast 1000 ms' );
 }, 1000 );
*/

