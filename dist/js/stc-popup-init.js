var stc = stc || {};
(function(util){

    /**
     * Sets a cookie.
     *
     * @param {String} cname Name of the cookie.
     * @param {String} cvalue Value of the cookie.
     * @param {Int} exdays Number of days the cookie will last.
     * @param {String} [domain] The domain name to set the cookie for.
     */
    util.setCookie = function(cname, cvalue, exdays, domain, sameSite, secure) {
        sameSite = sameSite || 'none'
        secure = secure !== false
        const d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' +
                (secure ? ';secure;sameSite=' + sameSite : '') +
                (domain ? ';domain=' + domain : '')
    }

    /**
     * Gets a cookie.
     *
     * @param {String} cname The name of the cookie to retrieve
     * @return {String} The value of the cookie
     */
    util.getCookie = function(cname) {
        var name = cname + '='
        var ca = document.cookie.split(';')
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }

    /**
     * Creates a custom event and dispatches it straight away
     *
     * @param {string} eventName the name of the event
     * @param {HTMLElement} [element=window] The DOM element to attach
     * the event to (defaults to window)
     */
    util.createEvent = function(eventName, element) {
        element = element || window
        var newEvent = new CustomEvent(eventName)
        element.dispatchEvent(newEvent)
    }

    /**
     * Retrieves JSON from a web service URL using JSON with padding.
     * @param {string} src The webservice URL.
     * @param {object} options The optional options.
     */
    util.jsonp = function(src, options) {
        var callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function(){},
            on_timeout = options.onTimeout || function(){},
            timeout = options.timeout || 10 // sec

        var timeout_trigger = window.setTimeout(function(){
            window[callback_name] = function(){}
            on_timeout()
        }, timeout * 1000)

        window[callback_name] = function(data){
            window.clearTimeout(timeout_trigger)
            on_success(data)
        }

        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = src

        document.getElementsByTagName('head')[0].appendChild(script)
    }

    /**
     * Gets the root domain name for a given hostname.
     * @param {string} hostName The full hostname to get the root of.
     * @return {string} The root domain.
     */
    util.getDomain = function(hostName){
        var domain = hostName

        if (hostName !== null) {
            var parts = hostName.split('.').reverse()

            if (parts !== null && parts.length > 1) {
                domain = parts[1] + '.' + parts[0]

                // add exceptions for or(g).xx
                if (hostName.toLowerCase().match(/\.org?\.[a-z][a-z]$/) && parts.length > 2) {
                    domain = parts[2] + '.' + domain
                }
            }
        }

        return domain
    }

}(stc.util = stc.util || {}));


/* polyfill fix for custom event in Internet Explorer */
(function() {
    if (typeof window.CustomEvent === 'function') {
        return false
    } // If not IE
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined }
        var evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
        return evt
    }
    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
})()

var stc = stc || {};
(function(geo){

    /**
     * Locate the visitor by IP.
     *
     * @desc Uses Skype API to retrieve user's country ISO code and set a country cookie.
     *
     * @return {string} 2-letter country ISO code (if set)
     */
    geo.locate = function() {
        stc.geo.country = ''
        stc.geo.country = stc.util.getCookie('stc_country')
        if(typeof stc.geo.country === 'undefined' || stc.geo.country === ''){
            stc.util.jsonp('https://cfwk.savethechildren.ngo/api/geo/country?callback=setCountry', {
                callbackName: 'setCountry',
                onSuccess: function(json){
                    stc.geo.country = json.country_code
                    stc.util.setCookie('stc_country', stc.geo.country, 14, stc.util.getDomain(window.location.hostname))
                    stc.util.createEvent('countryIsSet')
                },
                onTimeout: function(){
                    // do nothing
                },
                timeout: 5,
            })
        } else {
            (function($) {
                stc.util.createEvent('countryIsSet')
            })()
        }
        return stc.geo.country
    }

    /**
     * Sets the user language variable and cookie.
     * @param {string} [lng] The two-letter language code.
     *   Defaults to the main browser language or the user-set value if present.
     * @return {String} The language code.
     */
    geo.setUserLanguage = function(lng) {
        if(!lng) {
            lng = stc.util.getCookie('stc_user_language') || (navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage)
        }
        if(lng.length < 2) {
            return false
        }
        stc.util.setCookie('stc_user_language', lng, 14, stc.util.getDomain(window.location.hostname))
        geo.userLanguage = lng
        return lng
    }

    /**
     * The list of recognized country Members.
     */
    geo.members = ['AU', 'CA', 'CH', 'CO', 'DE',
        'DK', 'DO', 'ES', 'FI', 'FJ', 'GB', 'GT',
        'HK', 'HN', 'ID', 'IN', 'IS', 'IT', 'JP',
        'KR', 'LT', 'MX', 'NL', 'NO', 'NZ', 'PH',
        'RO', 'SE', 'SZ', 'US', 'ZA',
    ];

    /* Initialise some variables on page load */
    (function() {
        geo.setUserLanguage()
        geo.locate()
    })()

}(stc.geo = stc.geo || {}))

if(stc.geo.country) {
    init()
} else {
    window.addEventListener('countryIsSet', init)
}
stc.popupIsInit = false

function init() {
    if(!stc.popupIsInit && stc.util.getCookie('stc_popup_closed') !== '1' && stc.geo.members.indexOf(stc.geo.country) > -1 && stc.geo.country !== stc.popupOrigin) {
        stc.modal = stc.modal || {}
        stc.modal.baseURL = 'https://misc/member-popup/dist'
        var stcp = document.createElement('script')
        stcp.src = stc.modal.baseURL + '/js/stc-popup.min.js?ver=1572968762390'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(stcp, s)
        stc.popupIsInit = true
    }
}
