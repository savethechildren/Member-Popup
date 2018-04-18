var stc = stc || {};
(function(modal, $){

    modal.element = null;

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
        content.innerHTML = '<h1></h1>' + 
            '<div class="stc-popup-modal-content-body" id="stc-popup-content"></div>' +
            '<div class="stc-popup-modal-actions"><a href="javascript:stc.modal.close();" class="btn btn-negative btn-lg" id="stc-popup-stay">Stay here</a>' +
            '<a href="#" class="btn btn-primary btn-lg" id="stc-popup-continue">Continue to {country}</a></div>';

        var toMember = stc.geo.members[stc.geo.country];
        var fromMember = stc.geo.members[stc.popupOrigin];
        content.getElementsByTagName('h1')[0].innerHTML = toMember['popup']['title'];
        document.getElementById('stc-popup-content').innerHTML = '<p>' + toMember['popup']['text'] + '</p>';
        document.getElementById('stc-popup-continue').setAttribute('href', toMember['url']);
        document.getElementById('stc-popup-continue').text = toMember['popup']['btn'];
        document.getElementById('stc-popup-continue').addEventListener('click', modal.trackOutbound);
    }; 

    modal.show = function() {
        modal.element.className += " on";
        //reset body overflow
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    };

    modal.hide = function() {
        modal.element.className = modal.element.className.replace(' on', '');
        //reset body overflow
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
    };

    modal.close = function(event) {
        modal.hide();
        //todo: add cookie to remember choice for X days stc.util.setCookie('stc_popup_closed', '1', 14);
        //add event in GA
        if(stc.analytics && stc.analytics.isOn()) {
            stc.analytics.sendEvent('Member popup', 'Stay', stc.geo.country + ' - Stay');
        }
    };

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
