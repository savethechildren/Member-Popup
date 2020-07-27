stc.util.addCSS(stc.modal.baseURL + '/css/stc-popup.min.css?ver=1572968762390', function() {
    // load relevant member language file
    stc.util.addScript(stc.modal.baseURL + '/js/members/' + stc.popupOrigin + '.js?ver=1572968762390', function() {
        // initiate modal
        stc.modal.init()

        // wait for web fonts to be loaded before displaying the popup
        if(typeof WebFont !== 'undefined') {
            WebFont.load({
                custom: {
                    families: ['Gill Sans Infant', 'Trade Gothic LT'],
                },
                active: function() {
                    stc.modal.show()
                },
                // in case of timeout or other error still show popup
                inactive: function() {
                    stc.modal.show()
                },
            })
        } else {
            stc.modal.show()
        }
    })

})
