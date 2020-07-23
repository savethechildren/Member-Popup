var stc = stc || {};
(function(modal, $){

    modal.element = null

    /**
     * Initialises the popup by creating the required DOM elements.
     */
    modal.init = function() {
        var divmodal = stc.util.newDOMElement('div', 'stc-popup-modal', 'stcPopupModal')
        divmodal.addEventListener('click', function(event) {
            if(event.currentTarget !== event.target) {
                return false
            }
            modal.close()
        }, false)
        var innerModal = stc.util.newDOMElement('div', 'stc-popup-modal-inner', 'stcPopupInnerModal')
        var closeBT = stc.util.newDOMElement('div', 'stc-popup-modal-close', null, {title: 'Close'})
        var gradientBox = stc.util.newDOMElement('div', 'stc-popup-modal-gradient-box')
        innerModal.appendChild(gradientBox)
        closeBT.addEventListener('click', modal.close, false)
        innerModal.appendChild(closeBT)
        var content = stc.util.newDOMElement('div', 'stc-popup-modal-content')

        // close modal on esc key
        window.addEventListener('keyup', function(e) {
            if (e.keyCode === 27) {
                modal.close()
            }
        }, false)

        var version = stc.modal.version || 'a'

        // add picture element with different image sizes.
        var picture = stc.util.newDOMElement('picture', '')

        var img = stc.util.newDOMElement('img', 'img-fluid', null, {
            alt: 'Children playing with water',
            src: stc.modal.baseURL + '/img/covid_a_dsk.jpg',
        })
        var src1 = stc.util.newDOMElement('source', null, null, {
            media: '(max-width: 640px) and (orientation: portrait)',
            srcset: stc.modal.baseURL + '/img/covid_a_mob.jpg',
        })
        var src2 = stc.util.newDOMElement('source', null, null, {
            media: '(min-width: 641px)',
            srcset: stc.modal.baseURL + '/img/covid_a_dsk.jpg',
        })
        var popupTitle = 'Coronavirus Crisis'
        var popupText = 'In these difficult times, everyone is struggling. But at-risk children and families need your help to fight this pandemic. If we act fast, their communities can be prepared and resilient.'
        if(version === 'b') {
            img = stc.util.newDOMElement('img', 'img-fluid', null, {
                alt: 'Children playing with water',
                src: stc.modal.baseURL + '/img/covid_b_dsk.jpg',
            })
            src1 = stc.util.newDOMElement('source', null, null, {
                media: '(max-width: 640px) and (orientation: portrait)',
                srcset: stc.modal.baseURL + '/img/cobid_b.jpg',
            })
            src2 = stc.util.newDOMElement('source', null, null, {
                media: '(min-width: 641px)',
                srcset: stc.modal.baseURL + '/img/covid_b_dsk.jpg',
            })
            popupTitle = 'Coronavirus Emergency Appeal'
            popupText = 'Thank you for your interest in our work during this emergency. As you’ve just read, our teams are on the ground, ready to fight this pandemic. Please send help now, your support will keep children alive and safe so they can survive this crisis'
        }
        picture.appendChild(src1)
        picture.appendChild(src2)
        picture.appendChild(img)

        innerModal.appendChild(picture)
        innerModal.appendChild(content)
        divmodal.appendChild(innerModal)
        document.getElementsByTagName('body')[0].appendChild(divmodal)

        modal.element = divmodal

        // add inner content HTML
        content.innerHTML = '<h1>' + popupTitle + '</h1>' +
            '<div class="stc-popup-modal-content-body" id="stc-popup-content"><p>' + popupText + '</p>' +
            '<p>' +
            '<a href="https://donate.savethechildren.org/coronavirus?utm_source=web&utm_medium=lightbox&utm_campaign='
            + (version === 'a' ? 'homepage' : 'coronavirus')
            + '" class="btn btn-primary btn-lg" id="stc-popup-continue">Donate Now</a></p>'

        document.getElementById('stc-popup-continue').addEventListener('click', stc.modal.trackOutbound)
    }

    /**
     * Shows the modal.
     */
    modal.show = function() {
        modal.element.className += ' on'
        // reset body overflow
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    }

    /**
     * Hides the modal.
     */
    modal.hide = function() {
        modal.element.className = modal.element.className.replace(' on', '')
        // reset body overflow
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
    }

    /**
     * Closes the modal, sets the cookie and sends a GA event if relevant.
     * @param {string} [e] The name of the event to override the default 'Close' (optional).
     */
    modal.close = function(e) {
        modal.hide()
        stc.util.setCookie('stc_corona_closed', '1', 14, stc.util.getDomain(window.location.hostname))
        var eventName = typeof (e) === 'string' ? e : 'Close'
        // add event in GA
        if(stc.analytics && stc.analytics.isOn()) {
            stc.analytics.sendEvent('Coronavirus popup', eventName, eventName)
        }
    }

    /**
     * Tracks an outbound link before redirecting the user to it.
     * @param {object} e The initiating event.
     */
    modal.trackOutbound = function(e) {
        e.preventDefault()
        if(stc.analytics && stc.analytics.isOn()) {
            stc.analytics.sendEvent('Coronavirus popup', 'Donate', 'Donate', function() {
                window.location = e.target
            })
            // 1 second timeout fallback in case ga event doesn't call back
            window.setTimeout(function() { window.location = e.target }, 1000)
        } else {
            window.location = e.target
        }
    }

}(stc.modal = stc.modal || {}))
