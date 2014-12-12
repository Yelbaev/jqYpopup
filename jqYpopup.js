(function($){
"use strict";
$.fn.ypopup = function(o){

		var w, h, _w, _h;
		var x = 10; // width and height of window will be decreased for this value
		var ww = $(window).width();
		var wh = $(window).height();
		var html = $(this).html();

		if( typeof o == "string" ) {
			html = o;
		}
		else if( typeof o == "object" ) {
			// parsing settings we know

// WIDTH ----------------------------------------------------------->>>
			if( _w = o.w || o.width ) {
				// try to understand width

				// width is in pixels, points or just number. points are treated like pixels
				if( typeof _w == "number" ) {
					w = _w;
				}
				else if ( /^\d+(|px|pt)$/.test( _w ) ) {
					w = +_w.replace(/[^\d]/g,'');
				}
				// width is in percents
				else if( /^\d{1,2}(|\.\d+)%$/.test( _w ) ) {
					// calculate width from width of window 
					w = ww * ( +_w.replace(/[^\d\.]/g, '') ) / 100;
					w = Math.round( w );
				}
				// width in rem
				else if( /^\d+rem$/.test( _w ) ) {
					// get value of rem
					var rem = parseInt( $('body').css( 'font-size' ) );
					w = rem * parseFloat(_w);
				}
			}
			else {
				w = ww * 0.5;
			}

			if( w > ( ww - x) ) w = ww - x;

// <<<----------------------------------------------------------- WIDTH


// HEIGHT ----------------------------------------------------------->>>
			if( _h = o.h || o.height ) {
				// try to understand height
				
				// is in pixels, points or just number. points are treated like pixels
				if( typeof _h == "number" ) {
					h = _h;
				}
				else if( /^\d+(|px|pt)$/.test( _h ) ) {
					h = +_h.replace(/[^\d]/g,'');
				}
				// is in percents
				else if( /^\d{1,2}(|\.\d+)%$/.test( _h ) ) {
					// calculate width from height of window 
					h = wh * ( +_h.replace(/[^\d\.]/g, '') ) / 100;
					h = Math.round( h );
				}
				// is in rem
				else if( /^\d+rem$/.test( _h ) ) {
					// get value of rem
					var rem = parseInt( $('body').css( 'font-size' ) );
					h = rem * parseFloat(_h);
				}
			}
			else {
				h = wh * 0.5;
			}

			if( h > ( wh - x ) ) h = wh - x;

// <<<----------------------------------------------------------- HEIGHT
			if( o.html ) html = o.html;
		}
		else if( !html ) {
			if( console && console.log ) { console.log( "jqYpopup: No data to popup" ); }
			return false;
		}
	


		var p = jQuery( '#ypopup' );
		
		if( !p.length ) {
			// create popup if it was not created ealier
			jQuery("body").append( $("<div />").attr("id", "ypopup") );

			var p = jQuery( '#ypopup' );

			$(window).resize(function(){
				var d = jQuery( '#ypopup-inner' )
				if( typeof d == "undefined" || !d ) return;
				ww = $(window).width();
				wh = $(window).height();
				if( w && w < p.width() ) d.outerWidth( w );
				else d.outerWidth( p.width() - 10 );

				if( h && h < ( p.height() - 10 ) ) d.outerHeight( h );
				else d.outerHeight( p.height() - 10 );

				$( '#ypopup-close' ).hide( 0 );
								

				d.animate( {'margin-top': ( wh - d.outerHeight() ) / 2 + "px"}, { delay: 300, complete: function(){
					var button = $( '#ypopup-close' );
console.log( d.offset() );
					var left = (d.offset()).left - $(window).scrollLeft() + w - button.height() / 2;
					var top = (d.offset()).top - $(window).scrollTop() - button.height() / 2;
					if( left < 0 ) left = 0;
					else if( left > ww ) left = ww - button.width();
					if( top < 0 ) top = 0;
					else if( top > wh ) top = wh - button.height();
					button
						.css( { left: left, top: top })
						.delay(10)
						.show();
					}
				});
			});
		}

		if( typeof t == "undefined" || t == 'popup' ) {

			p.html('');

			p.css({
				"position": "fixed",
				"width": "100%",
				"height": "100%",
				"left": 0,
				"top": 0
			});
			
			if( o.overlay && o.overlay.bg ) p.css( "background", o.overlay.bg );
			else p.css( "background", "rgba( 155, 155, 155, 0.5 )" );

			p.append( $( '<div />' ).attr( "id", "ypopup-inner" ) );

			var d = $( "#ypopup-inner" );
		
			d.html( html );

			if( o.popup && o.popup.bg ) d.css( "background", o.popup.bg );
			else d.css( "background", "#f2f2f2" );

			if( o.popup && o.popup.bg ) d.css( "background", o.popup.bg );
			else d.css( "background", "#f2f2f2" );

			d.css({
				"border": "1px solid #909090", 
				"-webkit-border-radius": "4px", 
				"-moz-border-radius": "4px", 
				"-o-border-radius": "4px", 
				"border-radius": "4px",
				"height": "auto",
				"min-width": "200px",
				"margin": "auto", 
				"overflow": "auto", 
				"padding": "10px",
				"position": "relative"
			});

			d.outerWidth( w );
			d.outerHeight( h );

			d.on( 'click touchend', function( event ){
				if( typeof event == "undefined" || !event ) event = window.event;
				event.stopPropagation();
			});



			if( o.close !== false ) {
				p
					.on( 'click touchend', function(){ p.fadeOut( 500, function(){ $(this).remove() } ) })
					.fadeIn( 500 );

				p.append( 
					$('<a />')
						.attr( { 
							"href":"javascript:void(0)", 
							"title": "Close" ,
							"id": "ypopup-close"
						})
						.html('&#10005;') 
				);
				$( '#ypopup-close' )
					.css({
						"background": "#f2f2f2",
						"border": "1px solid black",

						"-webkit-border-radius": "100%",
						"-khtml-border-radius": "100%",
						"-moz-border-radius": "100%",
						"-o-border-radius": "100%",
						"border-radius": "100%",

						"-webkit-box-shadow": "0 0 2px #000",
						"-moz-box-shadow": "0 0 2px #000",
						"-o-box-shadow": "0 0 2px #000",
						"box-shadow": "0 0 2px #000",

						"color": "#000",
						"cursor": "pointer",
						"display": "none",
						"font-family": "Arial",
						"font-size": "18px",
						"font-weight": "bolder",
						"line-height": "25px",
						"position": "absolute",
						"left": "0px",
						"text-align": "center",
						"text-decoration": "none",

						"-webkit-text-shadow": "0 0 1px #f0f0f0",
						"-moz-text-shadow": "0 0 1px #f0f0f0",
						"-o-text-shadow": "0 0 1px #f0f0f0",
						"text-shadow": "0 0 1px #f0f0f0",

						"top": "0px",
						"vertical-align": "middle",
						"width": "25px",
					})
					.on( 'click touchend', function(){ p.trigger('click') });
			}

			d.animate( {'margin-top': ( wh - d.outerHeight() ) / 2 + "px"}, { duration: 300, complete: function(){ $(window).trigger('resize') }
			});
		}	
		return this;
	}

$.ypopup = function( o ){ $.fn.ypopup.apply( null, [o] ); };

}(jQuery));
