var stc = stc || {};
(function(util, $){
    
    /**
     * Uses detectmobilebrowsers.com regex to detect mobile browsers
     * @return {boolean} True if mobile or false
     */ 
    util.detectMobile = function(){
        var check = false;
        var rea = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge\ |maemo|midp|mmp|mobile.+firefox|netfront|opera\ m(ob|in)i|palm(\ os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows\ ce|xda|xiino/i;
        var reb = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a\ wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r\ |s\ )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1\ u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp(\ i|ip)|hs-c|ht(c(-|\ |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac(\ |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(\ |\/)|klon|kpt\ |kwc-|kyo(c|k)|le(no|xi)|lg(\ g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-|\ |o|v)|zz)|mt(50|p1|v\ )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v\ )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-|\ )|webc|whit|wi(g\ |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;
        (function(a){
            if(rea.test(a)||reb.test(a.substr(0,4))) {
                check = true;
            }
        })(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    
    /**
     * Persist isMobile boolean to avoid running regex on every call
     */
    util.isMobile = util.detectMobile();
    
    /**
     * Sets a cookie.
     * 
     * @param {String} cname Name of the cookie.
     * @param {String} cvalue Value of the cookie.
     * @param {Int} exdays Number of days the cookie will last.
     * @param {String} [domain] The domain name to set the cookie for.
     */
    util.setCookie = function(cname, cvalue, exdays, domain) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" +
                (domain ? ";domain=" + domain : "");
    };

    /**
     * Gets a cookie.
     * 
     * @param {String} cname The name of the cookie to retrieve
     * @return {String} The value of the cookie
     */
    util.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    
    /**
     * Creates a custom event and dispatches it straight away
     * 
     * @param {string} eventName the name of the event
     * @param {HTMLElement} [element=window] The DOM element to attach 
     * the event to (defaults to window)
     */
    util.createEvent = function (eventName, element) {
        element = element || window;
        var newEvent = new CustomEvent(eventName);
        element.dispatchEvent(newEvent);
    };
    
    /**
     * Checks if a given object already exists or waits for the relevant event
     * before firing a callback function.
     * 
     * @param {object} object The object to validate..
     * @param {type} event The event to listen for in case the object doesn't exist.
     * @param {type} callback The callback function to execute.
     */
    util.waitForObjectOrEvent = function(object, event, callback) {
        if(object) {
            callback();
        }
        else {
            window.addEventListener(event, callback);
        }
    };
    
    /**
     * Parses a given URL to extract its attributes.
     * 
     * @param {string} url The URL to be parsed.
     * @return {object} The parsed URL object.
     * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
     */
    util.parseURL = function (url) {
       
        var urlParsingNode = util.loadURLNode(url);

        // urlParsingNode provides the URLUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/')
                ? urlParsingNode.pathname
                : '/' + urlParsingNode.pathname
        };
    };
    
    /**
     * Loads the URL into an anchor DOM element.
     * 
     * @param {string} url The URL to parse.
     * @return {Element} The anchor element.
     */
    util.loadURLNode = function(url) {
        var urlParsingNode = document.createElement("a");
        var href = url;
        if (util.msie) {
            // Normalize before parse.  Refer Implementation Notes on why this is
            // done in two steps on IE.
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        return urlParsingNode;
    };
    
    /**
     * Checks if a given URL is local or external.
     * 
     * @param {string} url The url to test
     * @return {Boolean} True if local or false
     */
    util.isLocalURL = function(url) {
        var parsedURL = util.parseURL(url);
        return parsedURL.hostname === window.location.hostname;
    };
    
    /* list of extensions associated with file downloads */
    util.fileDownloadExt = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'csv'];
    
    /**
     * Checks if a given URL is a file download.
     * 
     * @param {string} url The url to test
     * @return {Boolean} True if file or false
     */
    util.isFileURL = function(url) {
        var pattern = new RegExp('.+\\.(' + util.fileDownloadExt.join('|') + ')((\\?|#).+)?$', 'i');
        return pattern.test(url);
    };
    
    /**
    * Returns the passed in URL as an absolute URL.
    *
    * @param {string} url The URL string to be normalized to an absolute URL.
    * @return {string} The normalized, absolute URL.
    */
    util.absoluteURL = function(url) {
        var parsedURL = util.parseURL(url);
        return parsedURL.href;
    };
    
    /**
     * Adds utm code from the current URL to any given URL;
     * 
     * @param {string} url The URL to add utm code to.
     * @return {string} The updated URL.
     */
    util.forwardUTM = function(url) {
        var params = util.parseURLParams();
        if(jQuery.isEmptyObject(params)) {
            return url;
        }
        var urlParsingNode = util.loadURLNode(url);
        
        var queryString = "";
        $.each(params, function(i,v) {
            if(/^utm_/.test(i)) {    
                queryString += "&" + i + "=" + v;
            }
        });
        if(urlParsingNode.search) {
            urlParsingNode.search += queryString;
        }
        else {
            urlParsingNode.search = "?" + queryString.substr(1);
        }
        return urlParsingNode.href; 
    };
    
    /**
     * Adds UTM tracking code to a given URL.
     * 
     * @param {string} url The URL to add tracking to.
     * @param {string} source The UTM source.
     * @param {string} medium The UTM medium.
     * @param {string} campaign The UTM campaign.
     * @return {string} The updated URL.
     */
    util.addUTM = function(url, source, medium, campaign) {
        var params = util.parseURLParams(url);
        if(params.utm_source) {
            return url;
        }
        var urlParsingNode = util.loadURLNode(url);

        var queryString = "&utm_source=" + source + "&utm_medium=" + medium + "&utm_campaign=" + campaign;
        if(urlParsingNode.search) {
            urlParsingNode.search += queryString;
        }
        else {
            urlParsingNode.search = "?" + queryString.substr(1);
        }
        return urlParsingNode.href;
    };

    /**
     * Parses the current URL search string into key value pairs.
     * 
     * @param {string} [url=location.href] The URL to parse. Defaults to the current url.
     * @return {object} The key/value pairs of URL paramaters.
     */
    util.parseURLParams = function(url) {
        var url = url || location.href;
        var parsedParameters = {};
        url = util.parseURL(url);
        if(url.search && url.search.length > 0) {
            var uriParameters = url.search.split('&');
            $.each(uriParameters, function(i,v) {
                var parameter = v.split('=');
                if(parameter.length === 2) {
                    parsedParameters[parameter[0]] = decodeURIComponent(parameter[1]);
                }
            });
        }
        return parsedParameters;
    };
    
    /**
     * Redirects the browser to a given URL.
     * 
     * @param {string} url The URL to redirect the user to.
     * @param {object} options Extra optional parameters.
     */
    util.goToURL = function(url, options) {
        options = options || {};
        var track = options.track || true;
        var action = options.eventAction || 'Click';
        var label = options.eventLabel || url;
        if(track && stc.analytics && stc.analytics.sendEvent) {
            stc.analytics.sendEvent('Outbound link', action, label);
        }
        if(options.replace) {
            window.location.replace(url);
        }
        else {
            window.location.href = url;
        }
    };
    
    /**
     * Hides the HTML body on the page when the page loads. 
     * Use when redirecting users.
     */
    util.hideOnLoad = function() {
        $('body').hide();
    };
    
    /**
     * Shows the HTML body if the page content needs to be displayed. 
     * Use when redirecting users is not possible and content must appear.
     */
    util.unhide = function() {
        $('body').show();
    };
    
    /* checks if the browser is Internet Explorer */
    util.msie = ~window.navigator.userAgent.indexOf('MSIE ') 
            || ~window.navigator.userAgent.indexOf('Trident/');
    
    /**
     * Adds multiple listeners and binds them to a single callback function.
     * 
     * @param {array} events The array of events to listen to.
     * @param {string} name A unique name to give to this multi listener.
     * @param {type} callback The callback function to execute once all listeners have been fired.
     * @return {bool} False if no events are passed
     */
    util.listenToMultiEvents = function(events, name, callback) {
        if(events.length < 1) {
            return false;
        }
        stcEventsNumber = stcEventsNumber = [];
        stcEventsNumber[name] = stcEventsNumber[name] || 0;
        $.each(events, function(i,v) {
            window.addEventListener(v, function() {
                stcEventsNumber[name] += 1;
                if(stcEventsNumber[name] === events.length) {
                    stcEventsNumber[name] = 0;
                    callback();
                }
            });
        });
    };
    
    /* send a ready event that can be used by inline scripts */
    $(function() { 
        stc.util.createEvent("stcReady"); 
    });
    
    /* remove no-js class */
    $('body').removeClass("no-js");
    
}(stc.util = stc.util || {}, jQuery));


/* polyfill fix for custom event in Internet Explorer */
(function () {
    if (typeof window.CustomEvent === "function") {
        return false;
    } //If not IE
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

/**
 * Renaming function as stcInterPopupModal to avoid clash 
 * with existing modal implementations.
 */


/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $('#stc-inter-popup')
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.stcInterPopupModal

  $.fn.stcInterPopupModal             = Plugin
  $.fn.stcInterPopupModal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.stcInterPopupModal.noConflict = function () {
    $.fn.stcInterPopupModal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
var stc = stc || {};

window.addEventListener('load', function(){
    window.removeEventListener('load', this, false);
    if(!window.ga || !ga.create) { 
        return false;
    }
       
    (function(analytics, ga, $){

        /**
         * Gets a GA property by wrapping ga.getAll();
         * @param {string} property The properry to retrieve.
         * @return {unresolved} The GA property if found.
         */
        analytics.getProperty = function(property) {
            return ga.getAll()[0].get(property);
        };
        
        analytics.trackingId = analytics.getProperty('trackingId');
        
        /**
         * Registers a GA ecommerce transaction for a donation.
         * 
         * @param {string} trans_id The transaction ID.
         * @param {string} item_name The product name.
         * @param {string} item_sku The product SKU.
         * @param {number} amount The donation amount.
         * @param {string} currency The three-letter currency code.
         * @return {undefined}
         */
        analytics.sendDonation = function(trans_id, item_name, item_sku, amount, currency) {
            if(!trans_id || !item_name || !item_sku || isNaN(amount)) {
                return false;
            }
            currency = currency || "USD";
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': trans_id,
                'affiliation': stc.geo.t('Save the Children'),
                'revenue': amount,
                'currency': currency
            });
            ga('ecommerce:addItem', {
                'id': trans_id,
                'name': item_name,
                'sku': item_sku,
                'category': stc.geo.t('Donation'),
                'price': amount,
                'quantity': '1',
                'currency': currency
            });
            ga('ecommerce:send');
        };
        
        /* Check if a transaction object exists on the page and send it to ga */
        if(analytics.donation && analytics.donation.trans_id) {
            var params = Object.keys(analytics.donation).map(function (key) { return analytics.donation[key]; });
            analytics.sendDonation.apply(this, params);
        }
        
        /**
         * Sends an event to GA.
         * 
         * @param {type} category The event category.
         * @param {type} action The action to record.
         * @param {type} [label] The event label.
         * @return {undefined}
         */
        analytics.sendEvent = function (category, action, label) {
            if(!category || !action || !label) {
                return false;
            }
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: (label ? label : ''),
                hitCallback: analytics.callback
            });
        };
        
        /**
         * Sends a page view to GA.
         * 
         * @param {string} [url] The path to record a view against.
         *   Defaults to current path.
         * @return {undefined}
         */
        analytics.sendPageView = function (url) {
            var url = url || location.pathname;
            ga('send', 'pageview', url, {hitCallback: analytics.callback});
        };
        
        /* Callback is only used for unit testing */
        analytics.callback = function() {
            analytics.lastEventTime = new Date().getTime();
        };
        
        /* Add some default event tracking on DOM ready */
        $(function() {
            /* Track events on buttons with a data-event attribute */
            $('button[data-event]').on('click', function() {
                analytics.sendEvent($(this).attr('data-event'), 'click', $(this).text());
            });
            
            /* Track events for custom event, outbound and download links */
            $('a').on('click', function() {
                var url = $(this).attr('href');
                // Custom event is specified in data-event
                if($(this).attr('data-event')) {
                    analytics.sendEvent($(this).attr('data-event'), 'click', url);
                }
                // Link is a file download
                else if (stc.util.isFileURL(url)) {
                    analytics.sendEvent('Download', 'click', url);
                }
                // Link is outbound
                else if(!stc.util.isLocalURL(url)) {
                    analytics.sendEvent('Outbound link', 'click', url);
                }
            });
        });

    }(stc.analytics = stc.analytics || {}, ga, jQuery));

});

var stc = stc || {};

(function(util, $){
    
    /**
     * Adds a script dynamically and executes a callback function 
     * when the script has loaded.
     * 
     * @param {string} src The URL of the script to load.
     * @param {function} callback The callback function called upon load.
     */
    stc.util.addScript = function (src, callback) {
        var s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = callback;
        document.body.appendChild(s);
    };

    /**
     * Adds a stylesheet dynamically and executes a callback function 
     * when the CSS has loaded.
     * 
     * @param {string} href The URL of the stylesheet to load.
     * @param {function} callback The callback function called upon load.
     */
    stc.util.addCSS = function (href, callback) {
        var s = document.createElement("link");
        s.setAttribute("rel", "stylesheet");
        s.setAttribute("type", "text/css");
        s.setAttribute("href", href);		
        s.onload = callback;
        document.getElementsByTagName("head").item(0).appendChild(s);
    };


}(stc.util = stc.util || {}, jQuery));


var stc = stc || {};
(function(inter, $){
    /**
     * Displays an animated loader while an asynchronous actions takes place.
     * 
     * @param {string} [element=body] The html ELEMENT TO DISPLAY THE LOADER IN.
     *   Defaults to body.
     */
    inter.showLoader = function(element) {
        var element = element || $('body');
        var loaderHtml = '<div class="stc-loader">' +
                              '<div class="stc-loader-inner">' +
                                  '<i class="fa fstc fstc-circle fa-spin fa-4x"></i>' +
                                  '<span class="sr-only">Loading...</span>' +
                              '</div>' +
                         '</div>';
        $(element).append($(loaderHtml).hide().fadeIn("fast"));
    };
    
    inter.hideLoader = function(element) {
        var element = element || $('body');
        $(element).find('div.stc-loader').fadeOut("fast", function(e) { $(this).remove(); });
    }; 

    
}(stc.inter = stc.inter || {}, jQuery));

var stc = stc || {};
(function(geo, $){

    /**
     * Replaces an element with the relevant culture's alternative
     * @param {String} country_code two-letter country ISO code 
     */
    geo.swapGeoAlternatives = function(country_code) {
        $('.stc-geo-alt').each(function(i,v) {
            if($(v).attr('data-geo') === country_code) {
                $(v).siblings().filter('.stc-geo-alt').addClass('hidden');
                $(v).removeClass('hidden');
            }
        });

        //select default country in drop-down
        $('select.stc-geo-select option').removeAttr('selected');
        $('select.stc-geo-select option').each(function(i,v) {
            if($(this).attr('data-geo') === country_code) {
                $(this).attr('selected','selected');
                return false;
            }
        });
    }; 
    
    /**
     * Changes the href attribute of a given link to a country-specific link.
     * @param {HTMLelement} linkElement The link element to modify.
     * @param {object} countryLinks The list of country links in a JSON object. 
     *   The object should have an iso  as key and url as value: {GB: '#urltoGB'}
     * @return {Boolean} False if no country set or invalid input.
     */
    geo.changeCountryLink = function(linkElement, countryLinks) {
        if(!geo.country || geo.country === "" || !countryLinks[geo.country]) {
            return false;
        }
        $(linkElement).attr('href', countryLinks[geo.country]);
    };

    /**
     * Locate the visitor by IP.
     * 
     * @desc Uses Skype API to retrieve user's country ISO code and set a country cookie.
     * Falls back to using CloudFlare geo location service exposed on www.savethechildren.net
     * 
     * @return {string} 2-letter country ISO code (if set)
     */
    geo.locate = function() {
        stc.geo.country = "";
        stc.geo.country = stc.util.getCookie('stc_country'); 
        if(typeof stc.geo.country === 'undefined' || stc.geo.country === ""){
            $.ajax({
                url: 'https://apps.skype.com/countrycode',
                timeout: 3000,
                jsonp: "jsoncallback",
                dataType: "jsonp"})
                .done(function(json){
                    stc.geo.country = json.country_code;
                    stc.util.setCookie('stc_country', stc.geo.country, 2);
                    stc.util.createEvent('countryIsSet');
                })
                //use CloudFlare fallback if Skype fails
                .fail(function(){
                    $.getJSON('https://www.savethechildren.net/webservices/geo/ajax.php?callback=?',
                        function(json){
                            stc.geo.country = json.country;
                            stc.util.setCookie('stc_country', stc.geo.country, 2);
                            stc.util.createEvent('countryIsSet');
                        });
                });
        }
        else {
            jQuery(function($) {
                stc.util.createEvent('countryIsSet');
            });
        }
        return stc.geo.country;
    };
    
    /**
     * Gets the user language based on browser settings
     * Uses https://ajaxhttpheaders.appspot.com to get accurate settings
     * @return {string} two-letter language code
     */
    geo.getUserLanguage = function() {
        geo.userLanguage = stc.util.getCookie('stc_user_language');
        if (typeof geo.userLanguage === 'undefined' || geo.userLanguage === "") {
            $.ajax({
                url: "https://ajaxhttpheaders.appspot.com",
                dataType: 'jsonp',
                success: function (headers) {
                    language = headers['Accept-Language'].substr(0, 2).toLowerCase();
                    geo.userLanguage = language;
                    stc.util.setCookie('stc_user_language', geo.userLanguage, 2);
                    stc.util.createEvent('userLanguageIsSet');
                    return geo.userLanguage;
                }
            });
        }
        else {
            stc.util.createEvent('userLanguageIsSet');
            return geo.userLanguage;
        }
        return geo.userLanguage;
    };
    
    /**
     * Sets the user language variable and cookie.
     * @param {string} [lng] The two-letter language code. 
     * Defaults to the main browser language or the user-set value if present.
     * @return {String} The language code.
     */
    geo.setUserLanguage = function(lng) {
        if(!lng) {
            var lng = stc.util.getCookie('stc_user_language') || (navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage);
        }
        if(lng.length < 2) {
            return false;
        }
        stc.util.setCookie('stc_user_language', lng, 2);
        geo.userLanguage = lng;
        return lng;
    };
    
    /**
     * Sets the user country variable and cookie.
     * @param {string} iso The two-letter country code
     * @return {Boolean} True if country was set or false.
     */
    geo.setUserCountry = function(iso) {
        if(iso.length !== 2) {
            return false;
        }
        geo.country = iso.toUpperCase();
        stc.util.setCookie('stc_country', stc.geo.country, 2);
        stc.util.createEvent('countryIsSet');
        return true;
    };

    /**
     * Gets the language of the page
     * @return {string} two-letter language code
     */
    geo.pageLanguage = document.documentElement.lang.substr(0,2).toLowerCase();
    
    /**
     * Declare empty array to hold translation strings
     */
    geo.strings = geo.strings || {};
    
    // Declare current page language translation strings obejct
    if(geo.pageLanguage && geo.pageLanguage !== "") {
        geo.strings[geo.pageLanguage] = geo.strings[geo.pageLanguage] || {};
    }
    
    /**
     * Translates a string from English into another language if the string exists
     * @param {string} original The original string to translate
     * @param {string} [lang] The two-letter language code to translate into, defaults to current page language
     * @param {string} [interpol] An optional interpolation object of key/value pairs.
     * @return {string} The translated and interpolated string if it exists or the original string
     */
    geo.t = function(original, lang, interpol) {
        lang = lang || geo.pageLanguage;
        if(!lang || lang === "") {
            return geo.interpolate(original, interpol);
        }
        //try to get language localized strings object
        var strings = geo.strings[lang];
        if(!strings || typeof strings !== 'object') {
            return geo.interpolate(original, interpol);
        }
        if(!strings[original] || strings[original] === "") {
            return geo.interpolate(original, interpol);
        }
        else {
            return geo.interpolate(strings[original], interpol);
        }
    };
    
    /**
     * Interpolation method to substitute tokens.
     * 
     * @param {string} original The original string containing the tokens.
     * @param {type} interpol the interpolation object of key/value pairs.
     * @return {string} The resulting interpolated string.
     */
    geo.interpolate = function(original, interpol) {
        if(!interpol) {
            return original;
        }
        var final = original;
        for (var key in interpol) {
            // skip loop if the property is from prototype
            if (!interpol.hasOwnProperty(key)) {
                continue;
            }
            var obj = interpol[key];
            var re = new RegExp('%{' + key + '}', 'g');
            final = final.replace(re, obj);
        }
        return final;
    };
    
    /* Initialise some variables on page load */
    $(function() {
        geo.locate();
        geo.setUserLanguage();
    });
    
    window.addEventListener("countryIsSet", function(e) { 
        stc.geo.swapGeoAlternatives(stc.geo.country);
    });

}(stc.geo = stc.geo || {}, jQuery));

var stc = stc || {};
(function(geo, $){
    
    /**
     * List of Member countries and their website URLs
     */
    geo.members = {
        "AU": {
            "iso": "AU",
            "title": "Australia",
            "url": "http://www.savethechildren.org.au",
            "url_donate": "https://www.savethechildren.org.au/donate/today",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "CA": {
            "iso": "CA",
            "title": "Canada",
            "url": "http://www.savethechildren.ca",
            "url_donate": "https://support.savethechildren.ca/DonatetoChildren",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "CO": {
            "iso": "CO",
            "title": "Colombia",
            "url": "https://www.savethechildren.org.co",
            "url_donate": "https://www.savethechildren.org.co/donar",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "DK": {
            "iso": "DK",
            "title": "Denmark",
            "url": "http://www.redbarnet.dk",
            "url_donate": "https://redbarnet.dk/stoet",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "DO": {
            "iso": "DO",
            "title": "Dominican Republic",
            "url": "http://savethechildren.org.do",
            "url_donate": "http://savethechildren.org.do",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "FJ": {
            "iso": "FJ",
            "title": "Fiji",
            "url": "http://www.savethechildren.org.fj",
            "url_donate": "http://www.savethechildren.org.fj/donate-now",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "FI": {
            "iso": "FI",
            "title": "Finland",
            "url": "http://www.pelastakaalapset.fi",
            "url_donate": "https://www.pelastakaalapset.fi/auta-lapsia/lahjoita/#/kertalahjoitus",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "DE": {
            "iso": "DE",
            "title": "Germany",
            "url": "http://www.savethechildren.de",
            "url_donate": "https://spenden.savethechildren.de",
            "mappedCountries": ["AT"],
            "supportedLanguages": []
        },
        "GT": {
            "iso": "GT",
            "title": "Guatemala",
            "url": "http://www.savethechildren.org.gt",
            "url_donate": "http://savethechildren.org.gt/como-ayudar",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "HN": {
            "iso": "HN",
            "title": "Honduras",
            "url": "http://www.savethechildrenhonduras.org",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "HK": {
            "iso": "HK",
            "title": "Hong Kong",
            "url": "http://www.savethechildren.org.hk",
            "url_donate": "https://savethechildren.org.hk/monthlygiving.aspx",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "IS": {
            "iso": "IS",
            "title": "Iceland",
            "url": "http://www.barnaheill.is",
            "url_donate": "http://www.barnaheill.is/Borninogthu/Einstaklingar/heillavinur",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "IN": {
            "iso": "IN",
            "title": "India",
            "url": "http://www.savethechildren.in",
            "url_donate": "https://support.savethechildren.in/#donate-form ",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "ID": {
            "iso": "ID",
            "title": "Indonesia",
            "url": "https://www.stc.or.id",
            "url_donate": "https://www.stc.or.id/donate",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "IT": {
            "iso": "IT",
            "title": "Italy",
            "url": "http://www.savethechildren.it",
            "url_donate": "https://www.savethechildren.it/dona-ora",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "JP": {
            "iso": "JP",
            "title": "Japan",
            "url": "http://www.savechildren.or.jp",
            "url_donate": "http://www.savechildren.or.jp/contribute",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "JO": {
            "iso": "JO",
            "title": "Jordan",
            "url": "http://jordan.savethechildren.net",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "KR": {
            "iso": "KR",
            "title": "Korea",
            "url": "http://www.sc.or.kr",
            "url_donate": "https://m.sc.or.kr/support/supportMonth.do",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "LT": {
            "iso": "LT",
            "title": "Lithuania",
            "url": "https://www.gelbekitvaikus.lt",
            "url_donate": "https://www.gelbekitvaikus.lt/paaukok",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "MX": {
            "iso": "MX",
            "title": "Mexico",
            "url": "https://www.savethechildren.mx",
            "url_donate": "https://www.savethechildren.mx/donar",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "NL": {
            "iso": "NL",
            "title": "Netherlands",
            "url": "https://www.savethechildren.nl",
            "url_donate": "https://www.savethechildren.nl/help-mee/donee",
            "mappedCountries": ["BE"],
            "supportedLanguages": []
        },
        "NZ": {
            "iso": "NZ",
            "title": "New Zealand",
            "url": "http://www.savethechildren.org.nz",
            "url_donate": "https://savethechildren.org.nz/how-to-help/donate",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "NO": {
            "iso": "NO",
            "title": "Norway",
            "url": "http://www.reddbarna.no",
            "url_donate": "https://www.reddbarna.no/gi",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "PH": {
            "iso": "PH",
            "title": "Philippines",
            "url": "http://www.savethechildren.org.ph",
            "url_donate": "https://donate.savethechildren.org.ph",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "RO": {
            "iso": "RO",
            "title": "Romania",
            "url": "http://www.salvaticopiii.ro",
            "url_donate": "http://www.salvaticopiii.ro/?id2=doneaza",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "ZA": {
            "iso": "ZA",
            "title": "South Africa",
            "url": "http://www.savethechildren.org.za",
            "url_donate": "https://www.savethechildren.org.za/donate",
            "mappedCountries": ["ZW", "NA"],
            "supportedLanguages": []
        },
        "ES": {
            "iso": "ES",
            "title": "Spain",
            "url": "http://www.savethechildren.es",
            "url_donate": "https://www.savethechildren.es/colaborar-ong/hazte-socio-y-cambia-la-vida-de-los-ninos-y-ninas-mas-vulnerables",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "SZ": {
            "iso": "SZ",
            "title": "Swaziland",
            "url": "http://www.savethechildren.org.sz",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "SE": {
            "iso": "SE",
            "title": "Sweden",
            "url": "http://www.rb.se",
            "url_donate": "https://www.raddabarnen.se/stod-oss/manadsgivare/#steg1",
            "mappedCountries": [],
            "supportedLanguages": []
        },
        "CH": {
            "iso": "CH",
            "title": "Switzerland",
            "url": "http://www.savethechildren.ch",
            "url_donate": "https://www.savethechildren.ch/de/online_spenden/spenden_neu.cfm",
            "mappedCountries": ["LI"],
            "supportedLanguages": []
        },
        "GB": {
            "iso": "GB",
            "title": "United Kingdom",
            "url": "http://www.savethechildren.org.uk",
            "url_donate": "https://secure.savethechildren.org.uk/donate",
            "mappedCountries": ["IE"],
            "supportedLanguages": []
        },
        "US": {
            "iso": "US",
            "title": "United States",
            "url": "http://www.savethechildren.org",
            "url_donate": "https://secure.savethechildren.org/site/c.8rKLIXMGIpI4E/b.8102415/k.1377/Please_Give_Monthly_to_Save_the_Children/apps/ka/sd/donor.asp",
            "mappedCountries": [],
            "supportedLanguages": []
        }
    };
    
    /**
     * Redirects visitors to a Member website, defaults to current member country.
     * 
     * @param {object} [member = geo.memberCountry] The Member object to redirect to.
     * @param {object} [options] The optional parameters to pass to util.goToUrl().
     * @return {boolean} True if redirection occurs or false.
     */
    geo.goToMemberSite = function(member, options) {
        member = member || geo.memberCountry;
        options = options || {};
        if(typeof member === "undefined" || typeof member.url === "undefined") {
            return false;
        }
        options.eventLabel = member.iso + " - " + member.url;
        stc.util.goToURL(member.url, options);
        return true;
    };
    
    /**
     * Hides page content and attempts to redirect visitors to a Member website.
     */
    geo.goToMemberSiteOnLoad = function() {
        stc.util.hideOnLoad();
        //wait for load event as well so that GA is available.
        stc.util.listenToMultiEvents(['load','countryIsSet'], 'redirectOnLoad',function() {
            if(!geo.goToMemberSite(null, {replace: true, eventAction: 'Redirect'})) {
                stc.util.unhide();
            }
        });
    };
    
    /**
     * Adds Member country select options to a given drop-down
     * @param {object} select The select element to add options to
     * @param {string} attribute The Member object attribute to use as the option value paramater
     */
    geo.addMembersSelectOptions = function(select, attribute) {
        if(select[0].nodeName === "SELECT") {
            $.each(geo.members, function(i,v) {
                if(attribute && !v[attribute]) {
                    return true;
                }
                var value = v[attribute] || i;
                var option = $('<option>' + v.title + '</option>').attr({"value": value, "data-geo": i});
                $(select).append(option);
            });
        }
        //run the geo selection
        geo.swapGeoAlternatives(geo.country);
        //if the value is a url, then add an onchange redirect behaviour 
        if(/url/.test(attribute)) {
            $(select).on('change', function() {
                stc.util.goToURL($(this).val(), {eventLabel: $(this).find('option:selected').attr('data-geo') + " - " + $(this).val()});
            }).closest('form').on('submit', function(e) {
                e.preventDefault();
                stc.util.goToURL($(select).val());
            });
        }
    };
    
    /**
     * Creates a modal window suggesting the visitor goes to the relevant Member country website.
     * @param {stc.member} [member = geo.countryMember] 
     *   The Member country to suggest to the visitor. Defaults to the current Member country if set.
     * @param {HTMLElement} [element = body]
     *   The HTML element to place the modal window in. Defaults to body.
     * @param {int} [days = 1]
     *   The number of days to remember the visitor's choice (if they choose to stay). Defaults to 1 day.
     */
    geo.suggestMemberSite = function(member, element, days) {
        member = member || geo.memberCountry;
        element = element || $('body');
        if(days !== 0 ) {
            days = days || 1;
        }
        if(typeof member !== "undefined" && typeof member.url !== "undefined" && stc.util.getCookie('stc_suggest_denied') !== "1") {
            var modal = $('<div/>').attr({id:'memberSuggestModal', class: 'modal fade', role: 'dialog', 'tab-index': '-1'})
                .append($('<div/>').attr({class:'modal-dialog', role: 'document'})
                    .append($('<div/>').attr({class:'modal-content'})
                        .append($('<div/>').attr({class:'modal-header'})
                            .append($('<button/>').attr({type:'button', class:'close', 'data-dismiss':'modal', 'aria-label':'Close'})
                                .append($('<span/>').attr('aria-hidden', 'true').html('&times;'))
                            )
                        )
                        .append($('<div/>').attr({class:'modal-body text-center'})
                            .append($('<h4/>').text('Welcome, ' + member.title + ' friend!'))
                            .append('<p>Good news, Save the Children has a website in ' + ($.inArray(member.iso, ['GB','US','NL']) > -1 ? "the " : "") + member.title + '.<br/>Do you wish to visit our ' + member.title + ' website?</p>')
                        )
                        .append($('<div/>').attr({class:'modal-footer'})
                            .append($('<button/>').attr({type:'button', class:'btn btn-default', 'data-dismiss':'modal'}).html('Stay on global page'))
                            .append($('<a>').attr({href:member.url, class:'btn btn-primary'}).html('Go to ' + member.title))
                        )
                    )
                );
            $(element).append($(modal).modal().on('hidden.bs.modal', function (e) {
                if(days > 0) {
                    stc.util.setCookie("stc_suggest_denied", "1", days);
                }
            })); 
        }
    };

    /**
     * Gets the user Member country object if it exists
     */ 
    stc.util.waitForObjectOrEvent(stc.geo.country, "countryIsSet", function() {
        geo.memberCountry = geo.members[geo.country];
        //check for mapped countries and reset user country if applicable
        if(typeof geo.memberCountry !== "object") {
            $.each(geo.members, function(i,v) {
                if($.inArray(geo.country, v.mappedCountries) > -1) {
                    geo.memberCountry = v;
                    geo.setUserCountry(v.iso);
                    return false;
                }
            });
        }
    });
    
}(stc.geo = stc.geo || {}, jQuery));
