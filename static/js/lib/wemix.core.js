/*
 WEMIX Wallet Landing
 2021/01/04  Han, Ju-Nyeong INITIAL CODING
 author Han, Ju-Nyeong(eden615@wemade.com)
*/

(function () {
  "use strict";

  if (typeof window.WEMIX === "undefined") {
    window.WEMIX = {};
  }

  WEMIX.namespace = function (ns) {
    var parts = ns.split("."),
      parent = WEMIX,
      i;

    if (parts[0] === "WEMIX") {
      parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
      if (typeof parent[parts[i]] === "undefined") {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }
    return parent;
  };

  WEMIX.namespace("WEMIX");

  // ----------------------------------------
  //	jQuery.ajax 호출 기본 설정
  // ----------------------------------------
  $.ajaxSetup({
    cache: false,
    type: "post",
    dataType: "json",
    timeout: 15000,
  });

  /*
    |--------------------------------------------------------------------------
    | Utils
    |--------------------------------------------------------------------------
    |
    | # WEMIX.Utils.browser				브라우저 구분
    |
    */
  WEMIX.Utils = (function () {
    // ----------------------------------------
    // 	브라우저 구분
    //	 │
    //	 ├ console.log('엣지 : ' + WEMIX.Utils.browser.isMsieEdge());
    //   ├ console.log('익스 : ' + WEMIX.Utils.browser.isExplorer());
    //   ├ console.log('크롬 : ' + WEMIX.Utils.browser.isChrome());
    //   ├ console.log('isMsie : ' + WEMIX.Utils.browser.isMsie());
    //   ├ console.log('name : ' + WEMIX.Utils.browser.name);
    //   ├ console.log('version : ' + WEMIX.Utils.browser.version);
    //   ├ console.log('deviceType : ' + WEMIX.Utils.browser.deviceType);
    //   ├ console.log('mobileOsType : ' + WEMIX.Utils.browser.imobileOsTypesMsie);
    //   ├ console.log('mobileOsVersion : ' + WEMIX.Utils.browser.mobileOsVersion);
    //   ├ console.log('isIOS : ' + WEMIX.Utils.browser.isIOS());
    //   └ console.log('isAndroid : ' + WEMIX.Utils.browser.isAndroid());
    // ----------------------------------------
    var browser = (function () {
      var agent = navigator.userAgent;
      var mobileAgentRegex = /^.*iPhone.*|^.*iPod.*|^.*Android.*|^.*Dolfin.*|^.*Symbian.*WebKit.*|^Opera.*SKT.*|^.*Windows CE.*Opera.*|^Mozilla.*POLAR.*|^Mozilla.*NATEBrowser.*|^.*IEMobile.*|^Mozilla.*WV[0-9]+.*lgtelecom.*|^.*Opera Mini.*|^.*BlackBerry.*|^.*\(BB[1-9][0-9];.*Mobile.*|^.*\(Mobile.*Firefox.*|Tizen.*Mobile|^.*iPad.*/;
      var androidOsVersionRegex = /Android ([-0-9.]+)/;
      var iosVersionRegex = /OS ([-0-9_]+)/;
      var popconAppVersionRegex = /POPCONGAME\(.*([0-9.]+)/;
      var _browser,
        _version,
        _deviceType,
        _popconAppVersion,
        _mobileOsVersion,
        _mobileOsType;

      function extractMobileOsVersion(agent) {
        var popconAppOsVersion = popconAppVersionRegex.exec(agent);
        if (popconAppOsVersion) _popconAppVersion = popconAppOsVersion[1];
        var androidOsVersion = androidOsVersionRegex.exec(agent);
        if (androidOsVersion) {
          _mobileOsType = "android";
          _mobileOsVersion = androidOsVersion[1];
        }
        var iosVersion = iosVersionRegex.exec(agent);
        if (iosVersion) {
          _mobileOsType = "ios";
          _mobileOsVersion = iosVersion[1];
        }
      }
      if (mobileAgentRegex.test(agent)) {
        _deviceType = "mobile";
        extractMobileOsVersion(agent);
      } else {
        _deviceType = "pc";
      }

      if (agent.indexOf("APP_ANDORID_WEBVIEW") > -1) {
        _browser = "webview";
      } else {
        var M = agent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        );

        if (/APP_ANDORID_WEBVIEW/i.test(M)) {
          _browser = "webview";
        } else if (/edge/i.test(M[1])) {
          _browser = "edge";
        } else if (/trident/i.test(M[1])) {
          _browser = "explorer";
        } else if (/firefox/i.test(M[1])) {
          _browser = "firefox";
        } else if (/safari/i.test(M[1])) {
          _browser = "safari";
        } else if (M[1] === "Chrome") {
          // opera
          var temOpr = agent.match(/\b(OPR)\/(\d+.?\d*.?\d*.?\d*)/);
          // edge
          var temEdge = agent.match(/\b(Edge)\/(\d+.?\d*)/);
          // chrome
          var temChrome = agent.match(/\b(Chrome)\/(\d+.?\d*.?\d*.?\d*)/);

          //a genuine 'Chrome' reading will result from ONLY temChrome not being null.
          var genuineChrome =
            temOpr == null && temEdge == null && temChrome != null;
          if (temOpr != null) {
            _browser = temOpr[1].replace("OPR", "Opera");
            // _version = temOpr[2];
          }
          if (temEdge != null) {
            _browser = temEdge[1];
            // _version = temEdge[2];
          }
          if (genuineChrome) {
            _browser = temChrome[1];
            // _version = temChrome[2];
          }
        }
      }

      _browser = _browser.toLowerCase();

      return {
        name: _browser || "",
        version: _version || "",
        deviceType: _deviceType,
        mobileOsType: _mobileOsType,
        mobileOsVersion: _mobileOsVersion,
        isMsie: function () {
          return (
            _browser.indexOf("msie") != -1 || _browser.indexOf("trident") != -1
          );
        },
        isAndroid: function () {
          return _mobileOsType === "android";
        },
        isIOS: function () {
          return _mobileOsType === "ios";
        },
        isMsieEdge: function () {
          return _browser.indexOf("edge") != -1;
        },
        isChrome: function () {
          return _browser.indexOf("chrome") != -1;
        },
        isExplorer: function () {
          return _browser.indexOf("explorer") != -1;
        },
        isPopconApp: function () {
          return _popconAppVersion !== undefined;
        },
      };
    })();

    return {
      browser: browser,
    };
  })();
})(jQuery);

// ----------------------------------------
//	Inspired by base2 and Prototype
// ----------------------------------------
(function () {
  var initializing = false,
    fnTest = /xyz/.test(function () {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;

  // The base Class implementation (does nothing)
  window.Class = function () {};

  // Create a new Class that inherits from this class
  Class.extend = function (prop) {
    var _super = this.prototype;
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    var name;

    // Copy the properties over onto the new prototype
    for (name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] =
        typeof prop[name] === "function" &&
        typeof _super[name] === "function" &&
        fnTest.test(prop[name])
          ? (function (name, fn) {
              return function () {
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
              };
            })(name, prop[name])
          : prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = window.Class.extend;

    return Class;
  };
})(jQuery);
