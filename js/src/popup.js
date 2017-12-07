var stc = stc || {};
stc.util = stc.util || {};

stc.util.popup = function(current) {
    //check for jQuery
    try {
        jQuery;
        console.log('jQuery is ready');
        //jquery is loaded, carry on.
        // TODO replace with public CDN URL.
        stc.util.addScript("http://misc/member-popup/dist/js/stc-ui.min.js", function() {
            console.log('stc is ready');
            //stc is ready, listen to countryIsSet event.
            window.addEventListener('countryIsSet', function() {
                //let's check the user is in a member country different from the current one.
                if(current !== stc.geo.country && stc.geo.memberCountry && stc.util.getCookie('stc_suggest_denied') !== "1") {
                    console.log('display popup from ' + current + ' to ' + stc.geo.memberCountry.iso);
                    //dynamically load css.
                    stc.util.addCSS("http://misc/member-popup/dist/css/popup.min.css", function() {
                        console.log('css loaded');
                        //all good, now we can show the popup .
                        console.log("let's show a custom modal");
                        stc.util.popupMemberSite();
                    });
                }
            });
        });
    }
    catch(e) {
        //jQuery not loaded, let's add it.
        stc.util.addScript("https://code.jquery.com/jquery-3.2.1.min.js", function() {
            //try again now we have jQuery available.
            stc.util.popup(current);
        });
    }
};

stc.util.addScript = function (src, callback) {
    var s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = callback;
    document.body.appendChild(s);
};

stc.util.addCSS = function (href, callback) {
    var s = document.createElement("link");
    s.setAttribute("rel", "stylesheet");
    s.setAttribute("type", "text/css");
    s.setAttribute("href", href);		
    s.onload = callback;
    document.getElementsByTagName("head").item(0).appendChild(s);
};

stc.util.popupMemberSite = function(member, element, days) {
    member = member || stc.geo.memberCountry;
    element = element || $('body');
    if(days !== 0 ) {
        days = days || 1;
    }
    if(typeof member !== "undefined" && typeof member.url !== "undefined" && stc.util.getCookie('stc_suggest_denied') !== "1") {
        var modal = $('<div/>').attr({id:'memberSuggestModal', class: 'stc-inter-popup-modal stc-inter-popup-fade', role: 'dialog', 'tab-index': '-1'})
            .append($('<div/>').attr({class:'stc-inter-popup-modal-dialog', role: 'document'})
                .append($('<div/>').attr({class:'stc-inter-popup-modal-content'})
                    .append($('<div/>').attr({class:'stc-inter-popup-modal-header'})
                        .append($('<button/>').attr({type:'button', class:'close', 'data-dismiss':'modal', 'aria-label':'Close'})
                            .append($('<span/>').attr('aria-hidden', 'true').html('&times;'))
                        )
                    )
                    .append($('<div/>').attr({class:'stc-inter-popup-modal-body'})
                        .append($('<h4/>').text('Welcome, ' + member.title + ' friend!'))
                        .append('<p>Good news, Save the Children has a website in ' + ($.inArray(member.iso, ['GB','US','NL']) > -1 ? "the " : "") + member.title + '.<br/>Do you wish to visit our ' + member.title + ' website?</p>')
                    )
                    .append($('<div/>').attr({class:'stc-inter-popup-modal-footer'})
                        .append($('<button/>').attr({type:'button', class:'stc-inter-popup-btn', 'data-dismiss':'modal'}).html('Stay on global page'))
                        .append($('<a>').attr({href:member.url, class:'stc-inter-popup-btn-primary'}).html('Go to ' + member.title))
                    )
                )
            );
        $(element).append($(modal));
    }
}; 
