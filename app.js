var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
//var Macaw   = require('./macaw.js');
//var macaw   = Macaw();
var Macaw2  = require('./macaw2.js');
var macaw2  = Macaw2();


app.use('/', express.static( __dirname + '/public' ));

io.on('connection', ( socket ) => {
  socket.on('chat', (msg ) => {
    switch(msg){
      case 'sql':
        console.log( msg );
        break;
      case 'list':
        macaw2.init('mongodb://macaws:macaws@172.30.222.124:27017/macaws','macaws','macaws', 'list',io);
        break;
      default:
        socket.broadcast.emit('chat', msg );
        socket.emit( 'chat', msg );
        break;
    }
  })
})
/*
const http = require('http');
const server = http.createServer( (req, res ) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain' );
  res.end( 'Hello World' );
});
*/

server.on( 'listening', () => {
  console.log( 'listening on ' + port );
  console.log( '__dirname:' + __dirname );
  console.log( 'mongodb:' + process.env.MACAWS_SERVICE_HOST + ':' + process.env.MACAWS_SERVICE_PORT );
});

server.listen( port, ipaddress );



