var stc = stc || {};
(function(util){
    
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
            uriParameters.forEach(function(v) {
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
        events.forEach(function(v) {
            window.addEventListener(v, function() {
                stcEventsNumber[name] += 1;
                if(stcEventsNumber[name] === events.length) {
                    stcEventsNumber[name] = 0;
                    callback();
                }
            });
        });
    };

    util.jsonp = function(src, options){
        var callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function(){},
            on_timeout = options.onTimeout || function(){},
            timeout = options.timeout || 10; // sec
    
        var timeout_trigger = window.setTimeout(function(){
            window[callback_name] = function(){};
            on_timeout();
        }, timeout * 1000);
    
        window[callback_name] = function(data){
            window.clearTimeout(timeout_trigger);
            on_success(data);
        }
    
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;
    
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    
    /* send a ready event that can be used by inline scripts */
    (function() { 
        stc.util.createEvent("stcReady"); 
    })();
    
    /* remove no-js class */
    var a = document.getElementsByTagName("html")[0];
    a.className&&(a.className=a.className.replace(/no-js\s?/, ''));
    
}(stc.util = stc.util || {}));


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
