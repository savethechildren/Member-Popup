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
        ifrm.setAttribute("src", url);
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";  
        ifrm.onload = callback;
        container.appendChild(ifrm);
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

var stc = stc || {};
(function(modal, $){

    modal.element = null;

    modal.load = function(url) {
        
    };

    modal.init = function() {
        var divmodal = stc.util.newDOMElement('div', 'stc-popup-modal', 'stcPopupModal');
        divmodal.addEventListener("click", function(event) {
            if(event.currentTarget !== event.target) {
                return false;
            }
            modal.close();
        }, false);
        var innerModal = stc.util.newDOMElement('div', 'stc-popup-modal-inner', 'stcPopupInnerModal' );
        var closeBT = stc.util.newDOMElement('div', 'stc-popup-modal-close');
        closeBT.addEventListener("click", modal.close, false);
        closeBT.setAttribute("title", "Close");
        innerModal.appendChild(closeBT);
        var content = stc.util.newDOMElement('div','stc-popup-modal-content');
        innerModal.appendChild(content);

        //close modal on esc key
        window.addEventListener('keyup', function(e) {
            if (e.keyCode === 27) {
                modal.close();
            }
        }, false); 

        divmodal.appendChild(innerModal);

        document.getElementsByTagName('body')[0].appendChild(divmodal);

        modal.element = divmodal;
    };

    modal.show = function() {
        modal.element.className += " on";
    };

    modal.hide = function() {
        modal.element.className = modal.element.className.replace(' on', '');
    };

    modal.close = function(event) {
        modal.hide();
        //todo: add cookie to remember choice stc.util.setCookie('stc_popup_closed', '1', 2);
    };
    
}(stc.modal = stc.modal || {}));

stc.util.addCSS('dist/css/stc-popup.css', function() {
    console.log('CSS ready');
    //initiate modal
    stc.modal.init();

    //try to load iframe
    console.log("Loading frame: " + Math.round(Date.now()/1000));
    stc.util.loadIframe('https://misc/member-popup/page/index.html?from=' + 
    stc.popupOrigin + '&to=' + stc.geo.country + 
    '&lng=' + stc.geo.userLanguage, document.getElementsByClassName('stc-popup-modal-content')[0], function() {
        console.log('iFrame is ready: ' + Math.round(Date.now()/1000));
        stc.modal.show();
    });
}); 
