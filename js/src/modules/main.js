/* eslint-disable no-inner-declarations */
/* eslint-disable no-new-func */
import * as util from './utilities.js'
import * as geo from './international.js'

const baseURL = 'https://misc/member-popup/dist' // https://www.savethechildren.ngo/member-popup/dist

// Feature detect dynamic import() (Edge lacks support)
try {
    new Function('import("").catch(function(){})')()

    window.stc = window.stc || {}

    window.stc.util = { ...util }
    window.stc.geo = { ...geo }
    window.stc.popupIsInit = false

    function init() {
        if (!window.stc.popupIsInit && window.stc.util.getCookie('stc_popup_closed') !== '1'
            && window.stc.geo.members.indexOf(window.stc.geo.country) > -1
            && window.stc.geo.country !== window.stc.popupOrigin) {
            import('./modal.js')
                .then((modal) => {
                    window.stc.modal = { ...modal }

                    window.stc.modal.baseURL = baseURL

                    window.stc.util.addCSS(`${baseURL}/css/stc-popup.min.css`)
                        .then(() => {
                            import('./vendor/webfont.js')
                                .then(() => {
                                    modal.init()
                                    // wait for web fonts to be loaded before displaying the popup
                                    if (typeof WebFont !== 'undefined') {
                                        WebFont.load({
                                            custom: {
                                                families: ['Gill Sans Infant', 'Trade Gothic LT'],
                                            },
                                            active: () => {
                                                window.stc.modal.show()
                                            },
                                            // in case of timeout or other error still show popup
                                            inactive: () => {
                                                stc.modal.show()
                                            },
                                        })
                                    } else {
                                        window.stc.modal.show()
                                    }
                                    window.stc.popupIsInit = true
                                })
                        })
                })
                .catch(() => {
                    // Do nothing.
                })
        }
    }

    geo.locate().then(() => init())
} catch (err) {
    const stcp = document.createElement('script'); stcp.async = true; stcp.defer = true; stcp.src = `${baseURL}/js/stc-popup-init.min.js`
    const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(stcp, s)
}
