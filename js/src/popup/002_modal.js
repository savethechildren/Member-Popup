var stc = stc || {};
(function(modal, $){

    modal.element = null;

    /**
     * Initialises the popup by creating the required DOM elements.
     */
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

        //close modal on esc key
        window.addEventListener('keyup', function(e) {
            if (e.keyCode === 27) {
                modal.close();
            }
        }, false); 

        innerModal.appendChild(content);
        divmodal.appendChild(innerModal);
        document.getElementsByTagName('body')[0].appendChild(divmodal);

        modal.element = divmodal;
        
        //add inner content HTML
        content.innerHTML = '<h1>Welcome to Save the Children!</h1>' + 
            '<div class="stc-popup-modal-content-body" id="stc-popup-content"></div>' +
            '<div class="stc-popup-modal-actions"><a href="javascript:stc.modal.close();" class="btn btn-negative btn-lg" id="stc-popup-stay">Stay on International site</a>' +
            '<a href="#" class="btn btn-primary btn-lg" id="stc-popup-continue">Go to {country}</a></div>';

        var toMember = stc.geo.members[stc.geo.country];
        var popupText = "You've come to our international site, which contains information about our work with children around the world. You can also visit our {country} site to explore the different ways you can support our work.";
        var popupBtn = 'Go to {country} site';
        document.getElementById('stc-popup-content').innerHTML = '<p>' + popupText.replace(/\{country\}/g, toMember.title) + '</p>';
        document.getElementById('stc-popup-continue').setAttribute('href', toMember['url']);
        document.getElementById('stc-popup-continue').text = popupBtn.replace('{country}', toMember.title);
        document.getElementById('stc-popup-continue').addEventListener('click', modal.trackOutbound);
    };

    /**
     * Shows the modal.
     */
    modal.show = function() {
        modal.element.className += " on";
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
     */
    modal.close = function() {
        modal.hide();
        stc.util.setCookie('stc_popup_closed', '1', 14);
        //add event in GA
        if(stc.analytics && stc.analytics.isOn()) {
            stc.analytics.sendEvent('Member popup', 'Stay', stc.geo.country + ' - Stay');
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
