// ==UserScript==
// @name        CSS store.steampowered.com
// @namespace   Violentmonkey Scripts
// @match       *://store.steampowered.com/*
// @grant       GM_addStyle
// @run-at      document-idle
// @version     1.0.0
// ==/UserScript==

GM_addStyle(`

.html {
  max-width=900px;
}

@media screen and (max-width: 910px) {
  html.responsive .game_header_image_ctn img.game_header_image_full {
    width: 96vw !important;
    height: auto;
  }
}


@media screen and (max-width: 910px) {
  html.responsive .responsive_page_frame.with_header {
    --responsive-menu-floating-height: 0px;
  }
}

@media screen and (max-width: 910px) {
  html.responsive .glance_ctn {
    padding: 0px 0%;
    padding-right: 0%;
    padding-left: 0%;
  }
}

.widestore #game_highlights .leftcol {
  max-width: 900px;
}

.widestore #game_highlights .rightcol {
  ax-width: 900px;
}

@media screen and (max-width: 910px) {
  html.responsive .game_header_image_ctn img.game_header_image_full {
    width: 108%;
    height: auto;
  }
}

.widestore .game_header_ctn {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.responsive_page_template_content {
  --store-menu-overlap-height:  0px !important;
  --store-menu-floating-height: 0px !important;
}


.steamdb_stats_number {
  margin-right: 100px;
}
.steamdb_stats_grid {
  display: unset !important;
  margin-left: 10vw !important;
  argin: auto !important;
}

.steamdb_stats .block_content_inner {
  display: unset;
}


election {
  background: #54a5d4;
  text-shadow: 1px 1px 2px #000000aa;
  color: #fff;
}

._2rArjHHk-sJxtm0AQK-ifY {
  font-size-adjust: 0.79;
}

.steamdb_stats_logo{
  cale: 50%;
  display: none !important;

}


rightcol.game_meta_data {
    top: 100px;
    position: relative;
}



footer, .ds_flag, .responsive_header, ._1zTJhHtTtlupkl5JAkDjkj, div#global_header, div#footer, .store_header, .apphub_OtherSiteInfo, .broadcast_embed_top_ctn_trgt, .blockbg, .saleEventBannerLink, .gameslistremote_RemoteDownloadClientBar_hQ4Q9, .ErrorBoundary, .Focusable.Panel._16jZ3HEbtaJTl80pQINN2Y, .breadcrumbs, ._2QlYKhF-leHfMXFSiSshZC, .z68jZWX2r0Y-{
  display: none !important;
}

`);
