stc.util.addCSS(stc.modal.baseURL + '/dist/css/stc-popup.min.css', function() {
    //initiate modal
    stc.modal.init();
    
    //wait for web fonts to be loaded before displaying the popup
    if(typeof WebFont !== 'undefined') {
        WebFont.load({
            custom: {
                families: ['Gill Sans Infant', 'Trade Gothic LT'],
            },
            active: function() {
                stc.modal.show(); 
            },
            //in case of timeout or other error still show popup
            inactive: function() {
                stc.modal.show(); 
            }
        });
    } else {
        stc.modal.show();
    }

});
