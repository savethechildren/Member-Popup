stc.util.addCSS('dist/css/stc-popup.css', function() {
    console.log('CSS ready');
    //initiate modal
    stc.modal.init();

    //try to load iframe
    console.log("Loading frame: " + Math.round(Date.now()/1000));
    stc.util.loadIframe('https://misc/brand_2016/?from=' + 
    stc.popupOrigin + '&to=' + stc.geo.country + 
    '&lng=' + stc.geo.userLanguage, document.getElementsByClassName('stc-popup-modal-content')[0], function() {
        console.log('iFrame is ready: ' + Math.round(Date.now()/1000));
        stc.modal.show();
    });
}); 
