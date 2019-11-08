import * as util from './utilities2.js'
import * as geo from './members.js'
import * as analytics from './analytics.js'

window.stc = window.stc || {}
window.stc.util = {...util, ...window.stc.util}
window.stc.geo = {...geo, ...window.stc.geo}
window.stc.analytics = analytics

let element = null;

/**
 * Initialises the popup by creating the required DOM elements.
 */
const init = function() {
    var divmodal = util.newDOMElement('div', 'stc-popup-modal', 'stcPopupModal');
    divmodal.addEventListener('click', function(event) {
        if(event.currentTarget !== event.target) {
            return false;
        }
        window.stc.modal.close();
    }, false);
    var innerModal = util.newDOMElement('div', 'stc-popup-modal-inner', 'stcPopupInnerModal');
    var closeBT = util.newDOMElement('div', 'stc-popup-modal-close', null, {title: 'Close'});
    var gradientBox = util.newDOMElement('div', 'stc-popup-modal-gradient-box');
    innerModal.appendChild(gradientBox);
    closeBT.addEventListener('click', close, false);
    innerModal.appendChild(closeBT);
    var content = util.newDOMElement('div', 'stc-popup-modal-content');

    // close modal on esc key
    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) {
            window.stc.modal.close();
        }
    }, false);

    // add picture element with different image sizes.
    var picture = util.newDOMElement('picture', '');
    var img = util.newDOMElement('img', 'img-fluid', null, {
        alt: 'Children playing with water',
        src: window.stc.modal.baseURL + '/img/children_dsk.jpg',
    });
    var src1 = util.newDOMElement('source', null, null, {
        media: '(max-width: 640px) and (orientation: portrait)',
        srcset: window.stc.modal.baseURL + '/img/children_mob.jpg',
    });
    var src2 = util.newDOMElement('source', null, null, {
        media: '(min-width: 641px)',
        srcset: window.stc.modal.baseURL + '/img/children_dsk.jpg',
    });
    picture.appendChild(src1);
    picture.appendChild(src2);
    picture.appendChild(img);

    innerModal.appendChild(picture);
    innerModal.appendChild(content);
    divmodal.appendChild(innerModal);
    document.getElementsByTagName('body')[0].appendChild(divmodal);

    element = divmodal;

    var toMember = geo.extendedMembers[stc.geo.country];

    // load correct i18n data
    import('./i18n/' + stc.popupOrigin + '.js')
        .then(i18n => {
            stc.i18n = i18n.i18n
            var lng = i18n.i18n[stc.geo.userLanguage.substr(0, 2)] ? i18n.i18n[stc.geo.userLanguage.substr(0, 2)] : i18n.i18n.default;
            var toCountry = lng.countries[stc.geo.country];
            var popupText = lng.text.replace(/\{country\}/g, toCountry)
                .replace(/\{prefixCountry\}/g, geo.prefix(toCountry)).replace(/\.\./g, '.');
            var goBtn = lng.goBtn;

            // add inner content HTML
            content.innerHTML = '<h1>' + lng.title + '</h1>' +
                '<div class="stc-popup-modal-content-body" id="stc-popup-content"><p>' + popupText + '</p>' +
                '<p>' +
                '<a href="javascript:window.stc.modal.close(\'Stay\')" class="btn btn-empty btn-lg" id="stc-popup-stay">' + lng.stayBtn + '</a>' +
                '<a href="' + toMember['url'] + '" class="btn btn-primary btn-lg" id="stc-popup-continue">' + goBtn.replace('{country}', geo.prefix(toCountry)) + '</a></p>';

            document.getElementById('stc-popup-continue').addEventListener('click', stc.modal.trackOutbound);
        })
};

/**
 * Shows the modal.
 */
const show = function() {
    element.className += ' on';
    // reset body overflow
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
};

/**
 * Hides the modal.
 */
const hide = function() {
    element.className = element.className.replace(' on', '');
    // reset body overflow
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
};

/**
 * Closes the modal, sets the cookie and sends a GA event if relevant.
 * @param {string} [e] The name of the event to override the default 'Close' (optional).
 */
const close = function(e) {
    window.stc.modal.hide();
    window.stc.util.setCookie('stc_popup_closed', '1', 14, window.stc.util.getDomain(window.location.hostname));
    var eventName = typeof (e) === 'string' ? e : 'Close';
    // add event in GA
    if(window.stc.analytics && window.stc.analytics.isOn()) {
        window.stc.analytics.sendEvent('Member popup', eventName, window.stc.geo.country + ' - ' + eventName);
    }
};

/**
 * Tracks an outbound link before redirecting the user to it.
 * @param {object} e The initiating event.
 */
const trackOutbound = function(e) {
    e.preventDefault()
    if(window.stc.analytics && stc.analytics.isOn()) {
        window.stc.analytics.sendEvent('Member popup', 'Go', geo.country + ' - Go', function() {
            window.location = e.target;
        });
        // 1 second timeout fallback in case ga event doesn't call back
        window.setTimeout(function() { window.location = e.target; }, 1000)
    } else {
        window.location = e.target
    }
}

export {element, close, hide, init, show, trackOutbound}
