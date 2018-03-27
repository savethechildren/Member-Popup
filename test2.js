var stc = stc || {};
(function(util){

    util.loadIframe = function(url, container, callback) {
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", url);
        ifrm.style.width = "640px";
        ifrm.style.height = "480px"; 
        ifrm.style.display = "none";   
        ifrm.onload = callback;
        container.appendChild(ifrm);
    }

    util.addCSS = function (href, callback) {
        var s = document.createElement("link");
        s.setAttribute("rel", "stylesheet");
        s.setAttribute("type", "text/css");
        s.setAttribute("href", href);		
        s.onload = callback;
        document.getElementsByTagName("head").item(0).appendChild(s);
    }; 

    util.addScript = function (src, callback) {
        var s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = callback;
        document.body.appendChild(s);
    };

    

    util.addCSS('https://misc/stc-ui/dist/css/stc-ui.min.css', function() {
        console.log('CSS ready');
        //try to load iframe
        console.log("Loading frame: " + Math.round(Date.now()/1000));
        util.addScript('//misc/member-popup/js/src/stc-ui/elements/_members.js', function() {
            console.log(stc.geo.country + "|" + stc.popupOrigin + "|" + stc.geo.userLanguage);
            util.loadIframe('https://misc/brand_2016/?from=' + 
            stc.popupOrigin + '&to=' + stc.geo.country + 
            '&lng=' + stc.geo.userLanguage, document.getElementsByTagName('body')[0], function() {
                console.log('iFrame is ready: ' + Math.round(Date.now()/1000));
            });
        });
    });

}(stc = stc || {}));