var stc = stc || {};
(function(modal, $){

    modal.element = null;

    /**
     * Initialises the popup by creating the required DOM elements.
     */
    modal.init = function() {
        var divmodal = stc.util.newDOMElement('div', 'stc-popup-modal', 'stcPopupModal');
        if(stc.popupClose) {
            divmodal.addEventListener('click', function(event) {
                if(event.currentTarget !== event.target) {
                    return false;
                }
                modal.close();
            }, false);
        }
        var innerModal = stc.util.newDOMElement('div', 'stc-popup-modal-inner', 'stcPopupInnerModal' );
        var closeBT = stc.util.newDOMElement('div', 'stc-popup-modal-close', null, {title: 'Close'});
        var gradientBox = stc.util.newDOMElement('div', 'stc-popup-modal-gradient-box');
        innerModal.appendChild(gradientBox);
        closeBT.addEventListener('click', modal.close, false);
        if(stc.popupClose) {
            innerModal.appendChild(closeBT);
        }
        var content = stc.util.newDOMElement('div','stc-popup-modal-content');

        //close modal on esc key
        if(stc.popupClose) {
            window.addEventListener('keyup', function(e) {
                if (e.keyCode === 27) {
                    modal.close();
                }
            }, false);
        }

        //add picture element with different image sizes.
        var picture = stc.util.newDOMElement('picture','');
        var img = stc.util.newDOMElement('img','img-responsive', null, {
            alt: 'Children playing with water',
            src: stc.modal.baseURL + '/img/children_dsk.jpg',
        });
        var src1 = stc.util.newDOMElement('source',null, null, {
            media: '(max-width: 640px) and (orientation: portrait)',
            srcset: stc.modal.baseURL + '/img/children_mob.jpg',
        });
        var src2 = stc.util.newDOMElement('source',null, null, {
            media: '(min-width: 641px)',
            srcset: stc.modal.baseURL + '/img/children_dsk.jpg',
        });  
        picture.appendChild(src1);
        picture.appendChild(src2);
        picture.appendChild(img);
        
        innerModal.appendChild(picture);
        innerModal.appendChild(content);
        divmodal.appendChild(innerModal);
        document.getElementsByTagName('body')[0].appendChild(divmodal);

        modal.element = divmodal;

        var toMember = stc.geo.members[stc.geo.country];
        var fromMember = stc.geo.members[stc.popupOrigin];

        //load correct i18n data
        var lng = stc.modal.i18n[stc.geo.userLanguage.substr(0,2)] ? stc.modal.i18n[stc.geo.userLanguage.substr(0,2)] : stc.modal.i18n.default;
        var toCountry = lng.countries[stc.geo.country];
        var fromCountry = lng.countries[stc.popupOrigin];

        var popupText = lng.text;
        var stayText = lng.stayText;
        var goBtn = lng.goBtn;
        var stayBtn = lng.stayBtn;

        //add inner content HTML
        content.innerHTML = '<h1>' + lng.title + '</h1>' + 
            '<div class="stc-popup-modal-content-body" id="stc-popup-content"><p>' + popupText.replace(/\{country\}/g, stc.geo.prefix(toCountry)) + '</p>' +
            '<p>' +
            '<a href="' + toMember['url'] + '" class="btn btn-primary btn-lg" id="stc-popup-continue">' + goBtn.replace('{country}', stc.geo.prefix(toCountry)) + '</a></p>' +
            '<p>' + stayText + '</p></div>';

        document.getElementById('stc-popup-continue').addEventListener('click', stc.modal.trackOutbound); 
    };

    /**
     * Shows the modal.
     */
    modal.show = function() {
        modal.element.className += ' on';
        //reset body overflow
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    };

    /**
     * Hides the modal.
     */
    modal.hide = function() {
        modal.element.className = modal.element.className.replace(' on', '');
        //reset body overflow
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
    };

    /**
     * Closes the modal, sets the cookie and sends a GA event if relevant.
     * @param {string} [e] The name of the event to override the default 'Close' (optional).
     */
    modal.close = function(e) {
        modal.hide();
        stc.util.setCookie('stc_popup_closed', '1', 14, stc.util.getDomain(window.location.hostname));
        var eventName = typeof(e) === 'string' ? e : 'Close';
        //add event in GA
        if(stc.analytics && stc.analytics.isOn()) {
            stc.analytics.sendEvent('Member popup', eventName, stc.geo.country + ' - ' + eventName);
        }
    };

    /**
     * Tracks an outbound link before redirecting the user to it.
     * @param {object} e The initiating event.
     */
    modal.trackOutbound = function(e) {
        e.preventDefault();
        if(stc.analytics && stc.analytics.isOn()) {
            stc.analytics.sendEvent('Member popup', 'Go', stc.geo.country + ' - Go', function() {
                window.location = e.target;
            });      
            //1 second timeout fallback in case ga event doesn't call back
            window.setTimeout(function() { window.location = e.target; }, 1000);
        }
        else {
            window.location = e.target;
        }
    };

}(stc.modal = stc.modal || {}));
