var stc = stc || {};
(function(modal, $){

    modal.element = null;

    modal.load = function(url) {
        
    };

    modal.init = function() {
        var divmodal = stc.util.newDOMElement('div', 'stc-popup-modal', 'stcPopupModal' );
        var innerModal = stc.util.newDOMElement('div', 'stc-popup-modal-inner', 'stcPopupInnerModal' );
        var closeBT = stc.util.newDOMElement('div', 'stc-popup-modal-close');
        closeBT.addEventListener("click", modal.close, false);
        closeBT.setAttribute("title", "Close");
        innerModal.appendChild(closeBT);
        var content = stc.util.newDOMElement('div','stc-popup-modal-content');
        innerModal.appendChild(content);

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

    modal.close = function() {
        modal.hide();
        //todo: add cookie to remember choice stc.util.setCookie('stc_popup_closed', '1', 2);
    };
    
}(stc.modal = stc.modal || {}));
