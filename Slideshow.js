// ==UserScript==
// @name        Slideshow
// @namespace   Violentmonkey Scripts
// @version     1.0.0
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_addValueChangeListener
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @run-at      document-idle
// @description Makes a slideshow of your selected webpages.
// @downloadURL https://github.com/DanielLester83/SteamJavascriptHelpers/raw/refs/heads/main/Slideshow.js
// ==/UserScript==

/* //There's a newer feature to add different domain page to page transitions, ref:https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using#a_javascript-powered_custom_cross-document_mpa_transition
   //unfortunatly it's not worth my time to configure until firefox fully supports the associated functions. ref: https://developer.mozilla.org/en-US/docs/Web/API/PageSwapEvent#browser_compatibility
 * GM_addStyle(`

  @view-transition {
    navigatin: auto;
  }

  ::view-transition-group(root) {
    animation-duration: 0.5s;
  }

::view-transition-old(root) {
    animation-name: slide-out;
  }


::view-transition-new(root) {
    animation-name: slide-in;
  }


@keyframes slide-out {
  to {
    translate: -100vw;
  }
}

@keyframes slide-in {
  from {
    translate: 100vw;
  }
}

@keyframes fade-out {
  to {
    opacity: 0%;
  }
}

@keyframes fade-in {
  from {
    opacity: 100%;
  }
}



::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}

`);*/

function makeJSON( valueArray ){
  let    valueJSON = JSON.stringify( valueArray );
         valueJSON = valueJSON.replaceAll( '['   , '[\n' );
         valueJSON = valueJSON.replaceAll( '/"'  , '"'   );
         valueJSON = valueJSON.replaceAll( '",'  , '",\n');
         valueJSON = valueJSON.replaceAll( '"]'  , '"\n]');
  return valueJSON;
}

function getArray( name, promptText, defaultValue ) {
  let valueArray = JSON.parse( GM_getValue( name, '[]' ) );
  while( !valueArray[0] ) valueArray = prompt( promptText, defaultValue ).split(",") ;
  GM_setValue( name, makeJSON( valueArray ) );
  return valueArray;
}

let timeoutId, startId, randomId, stopId, includeId, excludeId;
let array   = getArray( 'array', "Please enter the url(s) for the slideshow", window.location.href );
let pointer = parseInt(  GM_getValue('pointer', 0) );
let enabled = GM_getValue('enabled') ;
let delay   = parseInt(  GM_getValue('delay', 60000) );
let delayStep   = parseInt(  GM_getValue('delayStep') );

if ( !delayStep ) {
  delayStep = 1;
  GM_setValue( 'delayStep', 1 );
}

let url = window.location.href;
if (url.endsWith('/')) url = url.slice(0, -1);
let index = array.indexOf( url );

if ( enabled && array [ pointer ] == url ) {
   timeoutId = setTimeout(function(){
    pointer++;
    if( pointer >= array.length ){
      pointer = 0;
    }
    GM_setValue('pointer', pointer);
    window.open( array[ pointer ], '_self' );
  }, delay);
}


document.addEventListener('keydown', (event) => {
    switch(event.key){
      case '+' : delay + delayStep ;
                 break;
      case '-' : delay - delayStep ;
                 break;
      case '*' : includeSlideshow();
                 break;
      case '/' : excludeSlideshow();
                 break;
      case '.' : toggle();
                 break;
      case '?' : alert(
`Slideshow Help
+ = Increase Delay
- = Decrease Delay
* = Include Current Page
/ = Exclude Current Page
. = Toggle On/Off
? = This Help Prompt`);
                 break;
    }
});

function setupMenu() {
    if ( GM_getValue( "enabled" ) ) {
      stopId   = GM_registerMenuCommand('Stop Slideshow' , stopSlideshow, 's');
      GM_unregisterMenuCommand( startId );
      GM_unregisterMenuCommand( randomId );
    } else {
      delay = 0 ;
      startId  = GM_registerMenuCommand('Run Slideshow From Start' , startSlideshowStart,  's');
      randomId = GM_registerMenuCommand('Run Slideshow From Random', startSlideshowRandom, 'r');
      GM_unregisterMenuCommand( stopId );
    }
    if ( index > -1 ){
      excludeId = GM_registerMenuCommand('Exclude This Page From Slideshow', excludeSlideshow, 'e');
      GM_unregisterMenuCommand( includeId );
    } else {
      includeId = GM_registerMenuCommand('Include This Page From Slideshow', includeSlideshow, 'i');
      GM_unregisterMenuCommand( excludeId );
    }
}

function toggle() {
  if ( enabled ) {
    GM_setValue( "enabled", false );
  } else {
    GM_setValue( "enabled", true  );
  }
  setupMenu();
}

function startSlideshowStart()  { startSlideshow(0); }
function startSlideshowRandom() { startSlideshow( Math.floor(Math.random() * (array.length + 1) ) ); }

function startSlideshow( first ) {
  GM_setValue("enabled", true );
  GM_setValue("pointer", first );
  setupMenu();
  timeoutId = setTimeout(function() {
    window.open( array[ first ], '_self' );
  }, delay );
}

function stopSlideshow() {
  GM_setValue("enabled", false );
  setupMenu();
  clearTimeout( timeoutId );
}

function includeSlideshow() {
  array.push( url );
  GM_setValue( "array", makeJSON( array ) );
  index = array.length;
  setupMenu();
}

function excludeSlideshow() {
  array.splice( index, 1 );
  GM_setValue( "array", makeJSON( array ) );
  index = -1;
  setupMenu();
}

setupMenu();
