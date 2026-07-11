// ==UserScript==
// @name         Steam Buttons
// @version      1.0
// @description  description
// @match        https://store.steampowered.com/app/*
// @grant        GM_addStyle
// @grant        window.close
// @run-at       document-idle
// @updateURL    https://github.com/DanielLester83/SteamJavascriptHelpers/blob/5879484cc4487416dc4366afa66e25a82c205f2b/SteamButtons.js
// @version      1.0
// @author       -
// @description  11/26/2025, 9:14:05 PM
// ==/UserScript==

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
var newdate = new Date();

var div = document.getElementById('shareBtn');
let HTML,lastvisited;

function addBtns() {

  lastvisited = localStorage.getItem('lastvisited ' + window.location.href.split('?')[0] );
  if( lastvisited == null ){
    lastvisited = new Date();
    localStorage.setItem('lastvisited ' + window.location.href.split('?')[0], newdate.toLocaleDateString("en-US", options));
  }

  try{ document.getElementById("spBtn").remove();             }catch (e) {/*First time the function gets called -> Elements doesn't exist yet*/}
  try{ document.getElementById("vrBtn").remove();             }catch (e) {/*First time the function gets called -> Elements doesn't exist yet*/}
  try{ document.getElementById("aiBtn").remove();             }catch (e) {/*First time the function gets called -> Elements doesn't exist yet*/}
  try{ document.getElementById("laBtn").remove();             }catch (e) {/*First time the function gets called -> Elements doesn't exist yet*/}
  try{ document.getElementById("eaBtn").remove();             }catch (e) {/*First time the function gets called -> Elements doesn't exist yet*/}
  try{ document.getElementById("fvBtn").remove();             }catch (e) {/*First time the function gets called -> Elements doesn't exist yet*/}

  HTML = "";

  if( !document.getElementById('category_block').innerHTML.match(/Single.player/i) )     HTML = HTML + '<div id="spBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium" href="#catagory_block"><div class="icon"><img class="category_icon" src="https://store.fastly.steamstatic.com/public/images/v6/ico/ico_singlePlayer.png" alt="" style="filter: invert(50%) sepia(100%) saturate(10000%); height:100%; width:100%;"></div></a></div>';
  if( document.getElementById('category_block').innerHTML.match(/VR.Only/i) )           HTML = HTML + '<div id="vrBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium" href="#catagory_block"><div class="icon"><img class="category_icon" src="https://store.fastly.steamstatic.com/public/images/v6/ico/ico_vr_support.png"   alt="" style="filter: invert(50%) sepia(100%) saturate(10000%); height:100%; width:100%;"></div></a></div>';

  if( document.getElementById('game_area_content_descriptors') && document.getElementById('game_area_content_descriptors').innerHTML.match(/AI /i) )  HTML = HTML + '<div id="aiBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium" href="#game_area_content_descriptors" style="color: red !important"><span>AI</span></a></div>';

  if( document.getElementsByClassName('against')[0] )                                    HTML = HTML + '<div id="laBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium" href="#responsive_apppage_details_right_ctn" style="color: red !important"><span>Language</span></a></div>';

  if( document.getElementById('earlyAccessHeader') )                                     HTML = HTML + '<div id="eaBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium" href="#earlyAccessHeader"  style="color: red !important"><span>Early</span></a></div>';
  if( document.getElementsByClassName('not_yet')[0] )                                    HTML = HTML + '<div id="eaBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium" href="#game_area_purchase" style="color: red !important"><span>Pre-Release</span></a></div>';



                                                                                         HTML = HTML + '<div id="fvBtn" style="flex-grow: 0;"><a class="btnv6_blue_hoverfade btn_medium"><span>' + lastvisited +  '</span></a></div>';
  div.insertAdjacentHTML('afterend', HTML );

}

addBtns();
