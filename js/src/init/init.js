if(stc.geo.country) {
    init();
}
else {
    window.addEventListener('countryIsSet', init);
}

function init() {
    if(stc.util.getCookie('stc_popup_closed') !== '1' && stc.geo.members.indexOf(stc.geo.country) > -1 && stc.geo.country !== stc.popupOrigin) {
        var stcp = document.createElement('script'); 
        stcp.src = 'https://misc/member-popup/dist/js/stc-popup.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(stcp, s);
    }
}
