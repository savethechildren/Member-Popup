var stc = stc || {};
(function(geo, $){

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
    
}(stc.geo = stc.geo || {}));
