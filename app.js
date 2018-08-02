var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var express = require('express');
var app     = express();
//var server  = require('http').Server(app);

//app.use('/', express.static( __dirname + '/public' ));

const http = require('http');
const server = http.createServer( (req, res ) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain' );
  res.end( 'Hello World' );
});

server.on( 'listening', () => {
  console.log( 'listening on ' + port );
  console.log( '__dirname:' + __dirname );
});

server.listen( port, ipaddress );


