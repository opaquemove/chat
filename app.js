'use strict'
var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
//var Macaw   = require('./macaw.js');
//var macaw   = Macaw();
var Macaw2  = require('./macaw2.js');
var macaw2  = new Macaw2();

var ipaddress       = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
var port            = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var mongo_ipaddress = process.env.MACAWS_SERVICE_HOST || "127.0.0.1";
var mongo_port      = process.env.MACAWS_SERVICE_PORT || 27017;

var mongourl  = null;

mongourl = 'mongodb:' + mongo_ipaddress + ':' + mongo_port;

//var mongourl  = "mongodb://macaws:macaws@172.30.222.124:27017/macaws";
// Red Hat OpenShift
mongourl  = "mongodb://macaws:macaws@" + mongo_ipaddress
             + ":" + mongo_port + "/macaws";
//mongourl  = "mongodb://macaws:macaws@macaws:27017/macaws";
// local mac
// mongourl  = "mongodb://" + mongo_ipaddress + ":" + mongo_port + "/macaws";

app.use('/', express.static( __dirname + '/public' ));

io.on('connection', ( socket ) => {
  socket.on('chat', (msg ) => {
    switch(msg){
      case 'sql':
        console.log( msg );
        break;
      case 'macaw':
        macaw2.select(mongourl,'macaws','macaws', msg, socket);
        break;
      case 'list':
        macaw2.select(mongourl,'macaws','macaws', 'list',socket);
        break;
//      case 'insert':
//        macaw2.insert(mongourl,'macaws','macaws', 'insert',socket, {"mac_name":"Catalina","action":"maya","url":"images/catalina.jpg"} );
//        break;
      default:
        macaw2.insert(mongourl,'macaws','chats', 'chat',socket,
         {"message":msg} );
        socket.broadcast.emit('chat', msg );
        socket.emit( 'chat', msg );
        break;
    }
  })
})
/*
simple website code
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
  console.log( 'server:'  + ipaddress + ':' + port );
  console.log( 'mongodb:' + mongo_ipaddress + ':' + mongo_port );
});

server.listen( port, ipaddress );



