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
        stc.geo.country = '';
        stc.geo.country = stc.util.getCookie('stc_country');
        if(typeof stc.geo.country === 'undefined' || stc.geo.country === ''){
            stc.util.jsonp('https://apps.skype.com/countrycode?jsoncallback=setCountry', {
                callbackName: 'setCountry',
                onSuccess: function(json){
                    stc.geo.country = json.country_code;
                    stc.util.setCookie('stc_country', stc.geo.country, 14, stc.util.getDomain(window.location.hostname));
                    stc.util.createEvent('countryIsSet');
                },
                onTimeout: function(){
                    // do nothing
                },
                timeout: 5,
            });
        } else {
            (function($) {
                stc.util.createEvent('countryIsSet');
            })();
        }
        return stc.geo.country;
    };

    /**
     * Sets the user language variable and cookie.
     * @param {string} [lng] The two-letter language code.
     *   Defaults to the main browser language or the user-set value if present.
     * @return {String} The language code.
     */
    geo.setUserLanguage = function(lng) {
        if(!lng) {
            lng = stc.util.getCookie('stc_user_language') || (navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage);
        }
        if(lng.length < 2) {
            return false;
        }
        stc.util.setCookie('stc_user_language', lng, 14, stc.util.getDomain(window.location.hostname));
        geo.userLanguage = lng;
        return lng;
    };

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
        geo.setUserLanguage();
        geo.locate();
    })();

}(stc.geo = stc.geo || {}));
