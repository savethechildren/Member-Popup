var stc = stc || {};
stc.util = stc.util || {};
stc.geo = stc.geo || {};

stc.util.popup = function(current) {
    var countries = current.split(",");
    //check for jQuery
    try {
        jQuery;
        console.log('jQuery is ready');
        //jquery is loaded, carry on.
        // TODO replace with public CDN URL.
        stc.util.addScript("http://misc/member-popup/dist/js/stc-ui.min.js", function() {
            console.log('stc is ready');
            //stc is ready, listen to countryIsSet event.
            stc.util.waitForObjectOrEvent(stc.geo.country, 'countryIsSet', function() {
                console.log('country is set');
                //let's check the user is in a member country different from the current one.
                if($.inArray(stc.geo.country, countries) === -1 && stc.geo.memberCountry && stc.util.getCookie('stc_suggest_denied') !== "1") {
                    console.log('display popup to ' + stc.geo.memberCountry.iso);
                    //dynamically load css.
                    stc.util.addCSS("http://misc/member-popup/dist/css/popup.min.css", function() {
                        console.log('css loaded');
                        //all good, now we can show the popup .
                        stc.util.popupMemberSite();
                    });
                }
            });
        });
    }
    catch(e) {
        //jQuery not loaded, let's add it.
        stc.util.addScript("zzhttps://code.jquery.com/jquery-3.2.1.min.js", function() {
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

stc.util.pmsAddScript = function(src) {
    return new Promise(function(resolve, reject) {
        var s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = function() {
            console.log(stc.util);
            resolve();
        };
        s.onrerror = reject("Could not load script");
        document.body.appendChild(s);
    });
};

stc.util.popupMemberSite = function(member, days) {
    member = member || stc.geo.memberCountry;
    if(days !== 0 ) {
        days = days || 1;
    }
    var texts = {};
    texts.title = stc.util.popup.title || "Welcome %{country} friend!";
    texts.title = stc.geo.t(texts.title, null, {country: stc.geo.t(member.title)});
    texts.main = stc.util.popup.main || "Good news, Save the Children has a website in your country.<br/>Do you wish to visit our %{country} website?";
    texts.main = stc.geo.t(texts.main, null, {country: stc.geo.t(member.title)});
    texts.action = stc.util.popup.action || "Go to %{country}";
    texts.action = stc.geo.t(texts.action, null, {country: stc.geo.t(member.title)});
    if(typeof member !== "undefined" && typeof member.url !== "undefined" && stc.util.getCookie('stc_suggest_denied') !== "1") {
        var modal = $('<div/>').attr({id:'memberSuggestModal', class: 'modal fade', role: 'dialog', 'tab-index': '-1'})
            .append($('<div/>').attr({class:'modal-dialog', role: 'document'})
                .append($('<div/>').attr({class:'modal-content'})
                    .append($('<div/>').attr({class:'modal-header'})
                        .append($('<button/>').attr({type:'button', class:'close', 'data-dismiss':'modal', 'aria-label':'Close'})
                            .append($('<span/>').attr('aria-hidden', 'true').html('&times;'))
                        )
                    )
                    .append($('<div/>').attr({class:'modal-body', style: 'text-align:center'})
                        .append($('<h4/>').text(texts.title))
                        .append('<p>' + texts.main + '</p>')
                    )
                    .append($('<div/>').attr({class:'modal-footer'})
                        .append($('<button/>').attr({type:'button', class:'btn', 'data-dismiss':'modal'}).html(stc.geo.t('Stay here')))
                        .append($('<a>').attr({href:member.url, class:'btn btn-primary'}).html(texts.action))
                    )
                )
            );

        var container = $('<div/>').attr({class: "stc-inter-popup", id: "stc-inter-popup"});
        $('body').append($(container)); 
        $(container).append($(modal).stcInterPopupModal().on('hidden.bs.modal', function (e) {
            if(days > 0) {
                stc.util.setCookie("stc_suggest_denied", "1", days);
            }
        }));
    }
};
