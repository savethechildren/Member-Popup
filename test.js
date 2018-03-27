

var index = 0;
var scripts = [
    '//misc/member-popup/js/src/stc-ui/_utilities.js',
    "//misc/member-popup/js/src/stc-ui/elements/_international.js"
];



function loadScript() {
    if(index >= scripts.length) {
        return false;
    }
    var stcp = document.createElement('script'); 
    stcp.src = scripts[index];
    stcp.onload = function() {
        window.setTimeout(loadScript, 1);
    }
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(stcp, s);
    index++;
}

loadScript();

function scriptsLoaded() {
    
}

window.addEventListener('countryIsSet', countrySet);

function countrySet() {
    console.log('Country of the website: ' + stc.popupOrigin);
    console.log('Country of the user: ' + stc.geo.country);
    if(stc.geo.members.indexOf(stc.geo.country) > -1 && stc.geo.country !== stc.popupOrigin) {
        console.log('Display popup: popupUrl.com?from=' + stc.popupOrigin + '&amp;to=' + stc.geo.country);
        var stcp = document.createElement('script'); 
        stcp.src = 'test2.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(stcp, s);
    }
}