/**
 * Adds a stylesheet and calls back when complete.
 * @param {string} href The URL of the stylesheet.
 * @param {function} callback The callback function.
 */
const addCSS = (href) => new Promise((resolve, reject) => {
    const s = document.createElement('link')
    s.setAttribute('rel', 'stylesheet')
    s.setAttribute('type', 'text/css')
    s.setAttribute('href', href)
    s.onload = resolve(href)
    s.onerror = reject(href)
    document.getElementsByTagName('head').item(0).appendChild(s)
})

/**
 * Creates a new DOM element.
 * @param {string} type The element name.
 * @param {string} className The element CSS class name.
 * @param {string} id The elemnt ID.
 * @param {object} attrs The element attributes.
 * @return {object} The newly created DOM element.
 */
const newDOMElement = (type, className, id, attrs) => {
    const e = document.createElement(type)
    if(className) {
        e.className = className
    }
    if(id) {
        e.id = id
    }
    if(typeof (attrs) === 'object') {
        Object.keys(attrs).forEach((key) => {
            e.setAttribute(key, attrs[key])
        })
    }
    return e
}

/**
 * Adds UTM tracking code to a given URL.
 * @param {string} url The URL to add tracking to.
 * @param {string} source The UTM source.
 * @param {string} medium The UTM medium.
 * @param {string} campaign The UTM campaign.
 * @return {string} The updated URL.
 */
const addUTM = (url, source, medium, campaign) => {
    const fullURL = new URL(url)
    const params = fullURL.searchParams
    if(params.utm_source) {
        return url
    }

    const queryString = `&utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
    if(fullURL.search) {
        fullURL.search += queryString
    } else {
        fullURL.search = `?${queryString.substr(1)}`
    }
    return fullURL
}

export {
    addCSS,
    newDOMElement,
    addUTM,
}
