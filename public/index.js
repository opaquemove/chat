  window.onload = init;
  window.onresize = resize;
  var slides = [];

  function init() {
    var form   = document.getElementById( 'form' );
    var chat   = document.getElementById( 'chat' );
    var messages = document.getElementById( 'messages' );
    form.addEventListener( 'submit', function( e ) {
      e.preventDefault();
      socket.emit( 'chat', chat.value );
      chat.value = '';
    });

    fitMessageArea();
    chat.focus();

    new Switch( 'Opt', null ).play();
    new Switch( 'SLIDEPLUS', slidePlus ).play();
    new Switch( 'SLIDEMINUS', slideMinus ).play();

    slides.push( new playSlide('scarlet', '#3399FF' ) );
    slides.push( new playSlide('camelot', 'orange' ) );
    slides.push( new playSlide('catalina', 'royalblue' ) );
    for ( var i=0; i<slides.length; i++ ) {
      setTimeout( "slides[" + i + "].play()", 1 + ( 1500 * i ) );
    }
  }

  function resize(){
    fitMessageArea();
  }

  function fitMessageArea() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    document.getElementById('MESSAGE_AREA').style.width = ( w - 2) + 'px';
    document.getElementById('MESSAGE_AREA').style.height = ( h - 80 ) + 'px';
  }

  var socket = io();
  socket.on( 'chat', function( msg ) {
    var li = document.createElement( 'li' );
    li.textContent = msg;
    messages.appendChild( li );
  });

  socket.on( 'history', function( msg ) {
    var mac = eval( msg );
    for ( var i=0; i<mac.length; i++ ) {
      var li =  document.createElement( 'li' );
      li.textContent = mac[i].message;
      messages.appendChild( li );
    }
  });

  socket.on( 'list', function( msg ) {
    var mac = eval( msg );
    for ( var i=0; i<mac.length; i++ ) {
      var li =  document.createElement( 'li' );
      li.textContent = mac[i].mac_name + "(" + mac[i].url + ")(" + mac[i].action + ")";
      messages.appendChild( li );
    }
  } );

  socket.on( 'list2', function( msg ) {
    var mac = eval( msg );
    for ( var i=0; i<mac.length; i++ ) {
      var li =  document.createElement( 'li' );
      li.textContent = mac[i].mac_name + "(" + mac[i].url + ")(" + mac[i].action + ")";
      messages.appendChild( li );
    }
  } );

  socket.on( 'macaw', function( msg ) {
    var mac = eval( msg );
    play( mac, document.getElementsByName( "slide" ) );
  } );

  socket.on( 'stop', function( msg ) {
    stop();
  } );

  socket.on( 'pause', function( msg ) {
    pause();
  } );

  function slidePlus() {
    var o = new playSlide('spix', 'yellow');
    slides.push( o );
    o.play();
  }
  function slideMinus() {
    if ( slides.length == 0 ) return;
    var o = slides[ slides.length - 1 ];
    o.stop();
    slides.pop();
  }

  var macaws = new Array();
  var imac   = 0;

  function stop() {
    for ( var i=0; i<imac; i++ ) {
      macaws[i].stop();
    }
    imac   = 0;
  }

  function pause() {
    for ( var i=0; i<imac; i++ ) {
      macaws[i].pause();
    }
  }

  function play( mac, oParents ) {
    console.log( 'parents:' + oParents.length );
    for ( var k=0; k<oParents.length; k++ ) {
      for ( var i=0; i<mac.length; i++ ) {
        macaws[imac] = new Maya( "macaw[" + imac + "]", oParents[k], 900, 0, 0, 0, mac[i].url );
        imac++;
      }
    }
    for ( var i=0; i<imac; i++ ) {
      setTimeout( "macaws[" + i + "].play()", ( i * 1500 ) + 1 );
    }
  }



