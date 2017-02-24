;$( function() {
var generalConfig;
var animatedTextInIE = [];
/******************************************************************************
 * animation generator in IE11;
 * edited by Oleg Solodkyy;
 * github vida25;
 */
// ****************************************************************************
  if( document.body.style.webkitBackgroundClip !== undefined )
    return;

 animatedTextInIE = [];
/*
************************************************************************
************************************************************************
************************************************************************
************************************************************************
*/
// Here we do configuration of our animaiton;

 generalConfig = [
{
      'color1': "#EB008B",                    // first color;
      'color2': "#00ADEE",                    // second color;
      'elementsClass': 'animatedTextInIE11',  // class of elements we need to animate;
      'classToStyleSvg': 'headline'           // class with font style of svg elements;
  }
]

/*
************************************************************************
************************************************************************
************************************************************************
************************************************************************
*/

    function animationForTexConstructor ( ) { }

    animationForTexConstructor.prototype.initialize = function ( animationConfig ) {
        this.document    = window.document;
        this.setInterval = window.setInterval;
        this.setTimeout  = window.setTimeout;
        this.$           = jQuery;
        this.svgGlobal1  = [];
        this.svgGlobal2  = [];
        this.replaceMode = false;
        this.startIncrement  = -400;
        this.upDownInc       = 28;
        this.increment       = this.startIncrement;
        this.elements;
        this.classToStyleSvg;
        this.c        = this.document.createElement('canvas');
        this.c.width  = 800;
        this.c.height = 100;
        this.ctx      = this.c.getContext("2d");
     // Here we have the control Panel of our animation generator;
      // **************************************************************************
      // Here we pass colors of animation;

        this.color1 = animationConfig.color1; // Start point
        this.color2 = animationConfig.color2; // End Point
          // Here we pass class for style svg;
          this.classToStyleSvg = animationConfig.classToStyleSvg;

        // Here you pass class of elements you need to animate;
          elementsClass = animationConfig.elementsClass;

        this.elements = $( '.' + elementsClass ).css({'top': '-9999px', 'left': '-9999px', 'position': 'absolute'});
      }
              // Gradient style generator;
          animationForTexConstructor.prototype.createGradient =  function( ctx1 ) {
              var grd = ctx1.createLinearGradient( 0,10,this.increment,200);
              grd.addColorStop(0, this.color1);
              grd.addColorStop(1, this.color2);
              return grd;
          }

          animationForTexConstructor.prototype.addAttributes = function(el, attributes) {
            for (var key in attributes) {
              el.setAttribute(key, attributes[key]);
            }
          }

          animationForTexConstructor.prototype.createSvgElement = function( tagname ) {
            return this.document.createElementNS( 'http://www.w3.org/2000/svg', tagname );
          }

          animationForTexConstructor.prototype.createSVG = function() {
            var a = arguments[0],
                svg = this.createSvgElement('svg'),
                pattern = this.createSvgElement('pattern'),
                image = this.createSvgElement('image'),
                text = this.createSvgElement('text'),
                _this = this;
            // Add attributes to elements
            this.addAttributes(pattern, {
              'id' : a.id,
              'patternUnits' : 'userSpaceOnUse',
              'width' : a.width,
              'height' : a.height
            });

            this.addAttributes(image, {
              'width' : a.width,
              'height' : a.height
            });

            image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a.url);

            this.addAttributes(text, {
              'x' : 0,
              'y' : 80,
              'id' : a['id'],
              'class' : a['class'],
              'style' : 'fill:url(#' + a.id + ');'
            });

            // Set text
            text.textContent = a.text;

            // Add elements to pattern
            pattern.appendChild( image );

            // Add elements to SVG
            svg.appendChild( pattern );
            svg.appendChild( text );

            _this.svgGlobal2.push( svg );
            return svg;
          };

        // function that makes it work;
          animationForTexConstructor.prototype.ClipPolyfillProperty = function () {
            var el = arguments[0],
                a = arguments[1],
                i = arguments[2],
                parentElem = el.parentNode,
                replaceMode = this.replaceMode,
                _this = this,
                svg,
                img;
                img = new Image();
                img.onload = function imgOnload () {
                  svg = _this.createSVG({
                    'id' : a.patternID,
                    'url' : a.patternURL,
                    'class' : a.class,
                    'width' : this.width,
                    'height' : this.height,
                    'text' : el.textContent,
                    'background-position': '0px 0px' /* top  16px */
                });
                if( !replaceMode ) {
                  parentElem.appendChild( svg );
                } else {
                  parentElem.removeChild( _this.svgGlobal1[i] );
                  parentElem.appendChild( svg );
                }

            }
            img.src = a.patternURL;
        };

        animationForTexConstructor.prototype.convertCanvasToImage = function ( ) {
          var image = new Image();
              image.src = this.c.toDataURL("image/png");
          return image;
        }

        animationForTexConstructor.prototype.run = function ( ) {
          var _this = this;
          var imageSrc;

            // Fill with gradient
            if ( this.increment > -this.startIncrement ) {
              this.increment = this.startIncrement;
            }
            this.increment += this.upDownInc;

            this.ctx.fillStyle = this.createGradient( _this.ctx );
            this.ctx.fillRect( 0,0,1600,800 );

            imageSrc = this.convertCanvasToImage( ).src;

            $.each(_this.elements, function(i, element) {
              _this.ClipPolyfillProperty( element, {
                  'patternURL': imageSrc,
                  'class': _this.classToStyleSvg,
                }, i, _this.replaceMode);
            })

            this.svgGlobal1  = this.svgGlobal2;
            this.svgGlobal2  = [];
            this.replaceMode = true;

        }


// Here we initialize our animations;
generalConfig.forEach(function( config ) {
  animatedTextInIE.push( new animationForTexConstructor ( ) );
  animatedTextInIE[animatedTextInIE.length - 1].initialize( config );
})


// Here we define all elements we shoud hide and make some trick;
function animationRun() {
    animatedTextInIE.forEach(function( animatedText ) {
      animatedText.run( );
    });
    setTimeout(animationRun, 3e2);
}

animationRun();


});