stc.util.addCSS('dist/css/stc-popup.min.css', function() {
    console.log('CSS ready');
    //initiate modal
    stc.modal.init();
    

    //wait for web fonts to be loaded before displaying the popup
    WebFont.load({
        custom: {
            families: ['Gill Sans Infant', 'Trade Gothic LT'],
        },
        active: function() {
            console.log('fonts ready');
            stc.modal.show(); 
        }
    });

});