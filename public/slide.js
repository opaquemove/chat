function playSlide( title, backColor ) {
  this.oSlide  = null;
  this.title   = title;
  this.backgroundColor = backColor;
  this.orgLeft = 0;
  this.angle   = -90;
  this.oTimer  = null;
}

playSlide.prototype = {
  play: function () {
    var o = document.createElement( 'div' );
    o.setAttribute( 'name', 'slide' );	// o.name = value; not work
    o.style.zIndex   = 1000;
    o.style.position = 'absolute';
    o.style.top      = '0px';
    o.style.left     = '300px';
    o.style.width    = '80px';
    o.style.fontSize = '10px';
    o.style.padding  = '2px';
    o.style.border   = '1px solid #DDDDDD';
    o.style.backgroundColor = this.backgroundColor;
    o.style.visibility = 'hidden';
    o.innerText      = this.title;
    o.draggable      = 'true';
//    this.oSlide = document.body.appendChild( o );
    this.oSlide  = document.getElementById('SLIDEANIMATION_AREA').appendChild(o);
    this.orgLeft = parseInt( this.oSlide.style.left );

    this.oSlide.addEventListener( 'dragstart', function(e) {
      e.originalEvent.dataTransfer.setData( 'text', 'hoge' );
    }, false );

    this.oSlide.addEventListener( 'mouseover', function(e) {
      e.targer.style.cursor = 'pointer';
    }, false );

    this.oTimer = setInterval( ( function() {
      var left = parseInt( this.oSlide.style.left );
      var delta = Math.sin( ( this.angle % 360 ) * ( Math.PI / 180 ) ) * 300; 
      this.oSlide.style.visibility = 'visible';
      this.oSlide.style.left = ( this.orgLeft + delta ) + 'px';
      this.angle++;
    } ).bind( this ), 30 );
  },
  stop: function () {
    if ( this.oTimer != null ) {
      clearTimeout( this.oTimer );
      this.oTimer = null;
      document.getElementById('SLIDEANIMATION_AREA').removeChild( this.oSlide );
    }
  }

}


