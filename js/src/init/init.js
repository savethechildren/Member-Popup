stc.popupIsInit = false
stc.popupTimer = Date.now()

stc.modal.init = function() {
    stc.modal = stc.modal || {}
    stc.modal.baseURL = 'https://www.savethechildren.ngo/covid-popup/dist'
    if(stc.modal.version === 'a' && !stc.popupIsInit && stc.util.getCookie('stc_corona_closed') !== '1') {
        var stcp = document.createElement('script')
        stcp.src = stc.modal.baseURL + '/js/stc-popup.min.js?ver=1572968762390'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(stcp, s)
        stc.popupIsInit = true
    } else if (stc.modal.version === 'b' && !stc.popupIsInit) {
        if(Date.now() < stc.popupTimer + 180000) {
            window.setTimeout(stc.modal.init, 1000)
            return
        }
        stcp = document.createElement('script')
        stcp.src = stc.modal.baseURL + '/js/stc-popup.min.js?ver=1572968762390'
        s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(stcp, s)
        stc.popupIsInit = true
    }
}


stc.modal.init()
