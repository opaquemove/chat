// var Connection = require( 'tedious' ).Connection;
// var Request    = require( 'tedious' ).Request;
// var TYPES      = require( 'tedious' ).TYPES;

start();

function start() {
   var config = {
     userName: 'sa',
     password: 'Pa$$w0rd',
     server: 'localhost',
     options: {
       database: 'macaws',
       encrypt:  true
     }
   }
  var Connection = require( 'tedious' ).Connection;
  var cnn = new Connection( config );

  cnn.on ( 'connect', function( err ) {
    if ( err ) console.log( err );
      else {
      console.log( 'Connected' );
      var content = selectMacaws( cnn );
      console.log( content );
    }
  } );
  cnn.on( 'end', function ( err ) {
    console.log( 'Disconnected' );
  } );

}

function selectMacaws( cnn ) {
  var Request = require( 'tedious' ).Request;
  var req     = new Request( "SELECT mac_name FROM macaws", function( err ) {
    if ( err ) console.log( err );
  } );

  var result  = {};
  var content = [];

  cnn.execSql( req );

  req.on( 'row', function( columns ) {
    columns.forEach( function( column ) {
      if ( column.value == null ) {
        console.log( 'NULL' );
      } else {
        result[ column.metadata.colName ] = column.value;
      }
      content.push( result );
      result = {};
    } ); 
  } );

  req.on( 'requestCompleted', function() {
    console.log( 'requestCompleted' );
    console.log( content );
    cnn.close();
  } );

//  cnn.execSql( req );
//  console.log( 'execSQL' );
  return content;
}



