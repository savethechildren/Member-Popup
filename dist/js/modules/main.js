window.stc = window.stc || {}

import * as util from './utilities.js'
import * as geo from './international.js'

window.stc.util = {...util}
window.stc.geo = {...geo}
window.stc.popupIsInit = false

geo.locate().then(country => init())

function init() {
    if(!window.stc.popupIsInit && window.stc.util.getCookie('stc_popup_closed') !== '1'
        && window.stc.geo.members.indexOf(window.stc.geo.country) > -1
        && window.stc.geo.country !== window.stc.popupOrigin) {

        import('./modal.js')
        .then(modal => {
            window.stc.modal = {...modal}

            window.stc.modal.baseURL = 'https://www.savethechildren.ngo/member-popup/dist';

            window.stc.util.addCSS(stc.modal.baseURL + '/css/stc-popup.min.css?v=3.0')
                .then(css => {

                    import('./vendor/webfont.js')
                    .then(wfmodule => {
                        modal.init()
                        // wait for web fonts to be loaded before displaying the popup
                        if(typeof WebFont !== 'undefined') {
                            WebFont.load({
                                custom: {
                                    families: ['Gill Sans Infant', 'Trade Gothic LT'],
                                },
                                active: function() {
                                    window.stc.modal.show();
                                },
                                // in case of timeout or other error still show popup
                                inactive: function() {
                                    stc.modal.show();
                                },
                            });
                        } else {
                            window.stc.modal.show();
                        }
                    })

                });

        })
        .catch(err => {
            console.group(err);
        });



    }
}
