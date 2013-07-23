/*!
 * jQuery imagesLoaded Plugin v1.0
 * https://github.com/vobpler/jquery-imagesloaded
 *
 * Copyright 2013 Nicklas Sandell
 * Released under the MIT license
 */
(function(e){"use strict";function t(){var t=[];e("[data-equal-height]").each(function(){var r=e(this),i=r.data("equal-height");if(e.inArray(i,t)<0){n('[data-equal-height="'+i+'"]');t.push(i)}})}function n(t){var n=e(t);if(n.length<1){return false}var r=[];n.css("min-height",0);n.each(function(){r.push(e(this).outerHeight())});var i=Math.max.apply(null,r);n.css("min-height",i+"px")}e(document).ready(t);e(window).bind("orientationchange resize",t);e.fn.equalHeight=function(t){e(this).attr("data-equal-height",t);e(window).resize();return this};e.fn.disableEqualHeight=function(){e(this).each(function(){e(this).removeAttr("data-equal-height").css("min-height","0")});return this}})(jQuery)
