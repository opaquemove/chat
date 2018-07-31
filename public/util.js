function Switch( id, func ) {
  this.id = id;
  this.o  = null; 
  this.func = func;
}
Switch.prototype = {
  play: function() {
    this.o = document.getElementById( this.id );
    this.o.addEventListener( 'mouseover', ( function( e ) {
      e.target.style.backgroundColor = '#CCCCCC';
      e.target.style.cursor          = 'pointer';
    }).bind( this ), false );
    this.o.addEventListener( 'mouseout', ( function( e ) {
      e.target.style.backgroundColor = '';
    }).bind( this ), false );
    if ( this.func != null )
      this.o.addEventListener( 'mouseup', this.func, false ); 
  }
};

