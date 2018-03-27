var stc = stc || {};

(function(util, $){
    
    /**
     * Adds a script dynamically and executes a callback function 
     * when the script has loaded.
     * 
     * @param {string} src The URL of the script to load.
     * @param {function} callback The callback function called upon load.
     */
    util.addScript = function (src, callback) {
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
    util.addCSS = function (href, callback) {
        var s = document.createElement("link");
        s.setAttribute("rel", "stylesheet");
        s.setAttribute("type", "text/css");
        s.setAttribute("href", href);		
        s.onload = callback;
        document.getElementsByTagName("head").item(0).appendChild(s);
    };


}(stc.util = stc.util || {}, jQuery));
