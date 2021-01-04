/*
 WEMIX Wallet Landing
 2021/01/04  Han, Ju-Nyeong INITIAL CODING
 author Han, Ju-Nyeong(eden615@wemade.com)
*/

(function () {
  "use strict";

  WEMIX.namespace("WEMIX.Svc.Game");

  WEMIX.Svc.Game = Class.extend({
    init: function (obj) {
      var me = this;

      me.clickAppDownload();
    },
    // -------------------------------------------
    // store download
    // -------------------------------------------
    clickAppDownload: function () {
      var me = this;

      $("body").on("click", ".google", function (e) {
        var $self = $(this);
        if (WEMIX.Utils.browser.isAndroid()) {
          window.postMessage(
            "wemixwallet://openurl?url=" + $self.data("store-url")
          );
        } else {
          window.open($self.data("store-web-url"), "_blank");
        }
      });

      $("body").on("click", ".apple", function (e) {
        var $self = $(this);
        if (WEMIX.Utils.browser.isIOS()) {
          window.postMessage(
            "wemixwallet://openurl?url=" + $self.data("store-url")
          );
        } else {
          window.open($self.data("store-web-url"), "_blank");
        }
      });
    },
  });
})(jQuery);
