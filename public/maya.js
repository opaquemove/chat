function Maya( name, oParent, sTop, sLeft, eTop, eLeft, iFile ){
  this.name      = name;
  this.oParent   = oParent;
  this.oImg      = null;
  this.startTop  = sTop;
  this.startLeft = sLeft;
  this.endTop    = eTop;
  this.endLeft   = eLeft;
  this.imageFile = iFile;
  this.accellV   = 0;
  this.accellH   = 0;
  this.mode      = null;
  this.counter   = 0;
  this.timerID   = null;
  this.pauseFlg  = false;

}
Maya.prototype = {
  play : function() {
      this.counter = 0;
      this.mode      = "phase1";
      var oo         = document.createElement( "img" );
      oo.src         = this.imageFile;
      oo.style.position = "absolute";
      oo.style.opacity  = 0.75;
      // oo.style.zIndex   = 100;
      oo.style.top      = this.startTop  + "px";
      oo.style.left     = this.startLeft + "px";
      this.oImg         = this.oParent.appendChild( oo );

      this.timerID = setInterval( ( function() {
        if ( this.pauseFlg ) return;
        var top = parseInt( this.oImg.style.top, 10 );
        var left= parseInt( this.oImg.style.left, 10 );
        switch ( this.mode ) {
          case "phase1":
               if ( this.startTop != this.endTop )
                 top = top + ( this.endTop - top ) * 0.25;
               if ( this.startLeft != this.endLeft )
                 left= left+ ( this.endLeft-left ) * 0.25;
               break;
          case "phase2":
               this.accellV *= 1.25;
               this.accellH *= 1.25;
               if ( this.startTop != this.endTop )
                 top = top + this.accellV; 
               if ( this.startLeft != this.endLeft && 
                    !( this.startLeft-2 <= ( left + this.accellH ) &&
                       this.startLeft+2 >= ( left + this.accellH )  ) )
                 left += this.accellH;
               break;
        }
        this.oImg.style.top = top + "px";
        this.oImg.style.left= left+ "px";
 //       this.o.innerHTML = this.name + ":" + ( new Date() ) + ":" + top;
        this.counter++;
        if ( this.counter > 40 )
        {
          switch ( this.mode ) {
            case "phase1":
                 this.mode = "phase2";
                 this.accellV = ( this.startTop  > this.endTop  )?1:-1;
                 this.accellH = ( this.startLeft > this.endLeft )?1:-1;
                 break;
            case "phase2":
                 this.mode = "phase1";
                 break;
          }
          this.counter = 0;
        }
        //if ( top == this.endTop   ) this.mode = "phase2";
        //if ( top == this.startTop ) this.mode = "phase1";
      } ).bind(this), 50 );
  },
  pause : function () {
    this.pauseFlg = ! this.pauseFlg;
  },
  stop : function() {
    clearTimeout( this.timerID );  
    this.oParent.removeChild( this.oImg );
  }

};

