
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

export {
    addCSS,
    newDOMElement,
}
