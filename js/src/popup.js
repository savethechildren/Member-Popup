var stc = stc || {};
stc.util = stc.util || {};

stc.util.popup = function(current) {
    //check for jQuery
  try {
        jQuery;
        console.log('jQuery is ready');
        //jquery is loaded, carry on.
        // TODO replace with public CDN URL.
        stc.util.addScript("http://misc/stc-ui/dist/js/stc-ui.min.js", function() {
            console.log('stc is ready');
            //stc is ready, listen to countryIsSet event.
            window.addEventListener('countryIsSet', function() {
                //let's check the user is in a member country different from the current one.
                if(current !== stc.geo.country && stc.geo.memberCountry && stc.util.getCookie('stc_suggest_denied') !== "1") {
                    console.log('display popup from ' + current + ' to ' + stc.geo.memberCountry.iso);
                    //dynamically load css.
                    stc.util.addCSS("http://misc//member-popup/dist/css/popup.min.css", function() {
                        console.log('css loaded');
                        //all good, now we can show the popup .
                        stc.geo.suggestMemberSite();
                    });
                }
            });
        });
    }
    catch(e) {
        //jQuery not loaded, let's add it.
        stc.util.addScript("https://code.jquery.com/jquery-3.2.1.min.js", function() {
            //try again now we have jQuery available.
            stc.util.popup(current);
        });
    }
};

stc.util.addScript = function (src, callback) {
    var s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = callback;
    document.body.appendChild(s);
};

stc.util.addCSS = function (href, callback) {
    var s = document.createElement("link");
    s.setAttribute("rel", "stylesheet");
    s.setAttribute("type", "text/css");
    s.setAttribute("href", href);		
    s.onload = callback;
    document.getElementsByTagName("head").item(0).appendChild(s);
};

