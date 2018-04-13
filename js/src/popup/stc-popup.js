stc.util.addCSS('https://misc/member-popup/dist/css/stc-popup.css', function() {
    console.log('CSS ready');
    //initiate modal
    stc.modal.init();
    
    //wait for web fonts to be loaded before displaying the popup
    if(typeof WebFont !== 'undefined') {
        WebFont.load({
            custom: {
                families: ['Gill Sans Infant', 'Trade Gothic LT'],
            },
            active: function() {
                console.log('fonts ready');
                stc.modal.show(); 
            },
            //in case of timeout or other error still show popup
            inactive: function() {
                console.log('error loading fonts');
                stc.modal.show(); 
            }
        });
    } else {
        stc.modal.show();
    }

});
