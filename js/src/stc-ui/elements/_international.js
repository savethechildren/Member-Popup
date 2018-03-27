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
        stc.geo.country = "";
        stc.geo.country = stc.util.getCookie('stc_country'); 
        if(typeof stc.geo.country === 'undefined' || stc.geo.country === ""){
            stc.util.jsonp('https://apps.skype.com/countrycode?jsoncallback=handleStuff', {
                callbackName: 'handleStuff',
                onSuccess: function(json){
                    stc.geo.country = json.country_code;
                    stc.util.setCookie('stc_country', stc.geo.country, 2);
                    stc.util.createEvent('countryIsSet');
                },
                onTimeout: function(){
                    console.log('timeout!');
                },
                timeout: 5
            });
        }
        else {
            (function($) {
                stc.util.createEvent('countryIsSet');
            })();
        }
        return stc.geo.country;
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

    geo.members = ["AU", "CA", "CH", "CO", "DE", 
        "DK", "DO", "ES", "FI", "FJ", "GB", "GT", 
        "HK", "HN", "ID", "IN", "IS", "IT", "JO", 
        "JP", "KR", "LT", "MX", "NL", "NO", "NZ", 
        "PH", "RO", "SE", "SZ", "US", "ZA"
    ];
    
    /* Initialise some variables on page load */
    (function() {
        geo.setUserLanguage();
        geo.locate();
    })();

}(stc.geo = stc.geo || {}));
