var stc = stc || {};
(function(util){

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

    util.loadIframe = function(url, container, callback) {
        var ifrm = document.createElement("iframe");
        ifrm.id = "stc-popup-iframe";
        ifrm.setAttribute("src", url);
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";  
        ifrm.onload = callback;
        container.appendChild(ifrm);
        iFrameResize({heightCalculationMethod:'max'}, '#stc-popup-iframe');
    };

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

    util.newDOMElement = function (type, className, id, attrs) {
        var e = document.createElement(type);
        if(className && className !== "") {
            e.className = className;
        }
        if(id && id !== "") {
            e.id = id;
        }
        if(typeof(attrs) === "object") {
            e.attributes = attrs;
        }
        return e;
    };
    
}(stc.util = stc.util || {}));
