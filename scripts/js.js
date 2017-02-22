;$( function() {

/*
 * animation generator in IE11;
 * edited by Oleg Solodkyy;
 * github vida25;
 */

  var document    = window.document;
  var setInterval = window.setInterval;
  var setTimeout  = window.setTimeout;
  var $           = jQuery;
  var svgGlobal1   = [];
  var svgGlobal2   = [];
  var replaceMode = false;
  var elements = [];
  var speed;
  var classToStyleSvg;
  var elementIds;
  var t;
  var startIncrement = -400;
  var increment = startIncrement;
  var upDownInc = 28;

// Here we pass colors of animation;

  var color1 = "#EB008B"; // Start point
  var color2 = "#00ADEE"; // End Point

// Here we have the control Panel of our animation generator;
// **************************************************************************
      speed           = 350;  // We can make our animation faster or slower [ms];

      classToStyleSvg = 'headline'; // Here we pass class for style svg;

  // Here you pass elements Ids you need to animate;
      elementIds = [
    'headline',
    'headline1',
    'headline2',
    'headline3'
  ]
// ****************************************************************************

  if( document.body.style.webkitBackgroundClip !== undefined )
    return;

// function that makes it work;
  ClipPolyfillProperty = function () {
    var el = arguments[0],
        a = arguments[1],
        parentElem = el.parentNode,
        d = document,
        b = d.body,
        i = arguments[2],
        replaceMode = arguments[3];

  function addAttributes(el, attributes) {
    for (var key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
  }

  function createSvgElement( tagname ) {
    return d.createElementNS( 'http://www.w3.org/2000/svg', tagname );
  }

  function createSVG() {
    var a = arguments[0],
        svg = createSvgElement('svg'),
        pattern = createSvgElement('pattern'),
        image = createSvgElement('image'),
        text = createSvgElement('text');

    // Add attributes to elements
    addAttributes(pattern, {
      'id' : a.id,
      'patternUnits' : 'userSpaceOnUse',
      'width' : a.width,
      'height' : a.height
    });

    addAttributes(image, {
      'width' : a.width,
      'height' : a.height
    });

    image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a.url);

    addAttributes(text, {
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

    svgGlobal2.push( svg );
    return svg;
  };
    var img = new Image();
    img.onload = function imgOnload () {
      svg = createSVG({
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
          parentElem.removeChild( svgGlobal1[i] );
          parentElem.appendChild( svg );
        }

    }
    img.src = a.patternURL;
};

// Here we define all elements we shoud hide and make some trick;
    elementIds.forEach(function( elem ) {
      $( '#'+elem ).css({'top': '-9999px', 'left': '-9999px', 'position': 'absolute'});
      elements.push( document.getElementById( elem ) );
    });

// Here we define canvas element for our animation generator;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

// This setInterval make our animation;
setInterval( function() {
  var imageSrc = convertCanvasToImage( c ).src;

    // Fill with gradient
    if ( increment > -startIncrement ) {
      increment = startIncrement;
    }
    increment += upDownInc;

    ctx.fillStyle = createGradient( ctx );
    ctx.fillRect( 0,0,1600,800 );

    function convertCanvasToImage( canvas ) {
      var image = new Image();
          image.src = canvas.toDataURL("image/png");
      return image;
    }

    elements.forEach(function( element, i ) {
      ClipPolyfillProperty( element, {
          'patternURL': imageSrc,
          'class': classToStyleSvg,
        }, i, replaceMode);
    })

    svgGlobal1 = svgGlobal2;
    svgGlobal2 = [];
    replaceMode = true;

  }, speed);

    // Gradient style generator;
function createGradient( ctx1 ) {
    var grd = ctx1.createLinearGradient( 0,10,increment,200);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);
    return grd;
}

});
