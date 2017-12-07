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
     * @param {string} lang The two-letter language code to translate into, defaults to current page language
     * @return {string} The translated string if it exists or the original string
     */
    geo.t = function(original, lang) {
        lang = lang || geo.pageLanguage;
        if(!lang || lang === "") {
            return original;
        }
        //try to get language localized strings object
        var strings = geo.strings[lang];
        if(!strings || typeof strings !== 'object') {
            return original;
        }
        if(!strings[original] || strings[original] === "") {
            return original;
        }
        else {
            return strings[original];
        }
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
