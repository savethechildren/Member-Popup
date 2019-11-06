/**
 * Sets a cookie.
 *
 * @param {String} cname Name of the cookie.
 * @param {String} cvalue Value of the cookie.
 * @param {Int} exdays Number of days the cookie will last.
 * @param {String} [domain] The domain name to set the cookie for.
 */
function setCookie(cname, cvalue, exdays, domain, sameSite = 'None') {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cname}=${cvalue};${expires};path=/;secure;sameSite=${sameSite}`
    document.cookie += (domain ? `;domain=${domain}` : '')
}

/**
 * Gets a cookie.
 *
 * @param {String} cname The name of the cookie to retrieve
 * @return {String} The value of the cookie
 */
function getCookie(cname) {
    const name = `${cname}=`
    const ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i += 1) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

/**
 * Creates a custom event and dispatches it straight away
 *
 * @param {string} eventName the name of the event
 * @param {HTMLElement} [element=window] The DOM element to attach
 * the event to (defaults to window)
 */
function createEvent(eventName, element = window) {
    const newEvent = new CustomEvent(eventName)
    element.dispatchEvent(newEvent)
}

/**
 * Retrieves JSON from a web service URL using JSON with padding.
 * @param {string} src The webservice URL.
 * @param {object} options The optional options.
 */
function jsonp(src, options) {
    const callbackName = options.callbackName || 'callback',
        onSuccess = options.onSuccess || {},
        onTimeout = options.onTimeout || {},
        timeout = options.timeout || 10 // sec

    const timeoutTrigger = window.setTimeout(() => {
        window[callbackName] = () => {}
        onTimeout()
    }, timeout * 1000)

    window[callbackName] = (data) => {
        window.clearTimeout(timeoutTrigger)
        onSuccess(data)
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = src

    document.getElementsByTagName('head')[0].appendChild(script)
}

/**
 * Gets the root domain name for a given hostname.
 * @param {string} hostName The full hostname to get the root of.
 * @return {string} The root domain.
 */
function getDomain(hostName) {
    let domain = hostName

    if (hostName !== null) {
        const parts = hostName.split('.').reverse()

        if (parts !== null && parts.length > 1) {
            domain = `${parts[1]}.${parts[0]}`

            // add exceptions for or(g).xx
            if (hostName.toLowerCase().match(/\.org?\.[a-z][a-z]$/) && parts.length > 2) {
                domain = `${parts[2]}.${domain}`
            }
        }
    }

    return domain
}

export {
    createEvent, getCookie, getDomain, jsonp, setCookie,
}
