

/**
 * Checks if a given object already exists or waits for the relevant event
 * before firing a callback function.
 *
 * @param {object} object The object to validate..
 * @param {string} event The event to listen for in case the object doesn't exist.
 * @param {function} callback The callback function to execute.
 */
let waitForObjectOrEvent = function(object, event, callback) {
    if(object) {
        callback();
    } else {
        window.addEventListener(event, callback);
    }
};

/**
 * Adds a stylesheet and calls back when complete.
 * @param {string} href The URL of the stylesheet.
 * @param {function} callback The callback function.
 */
let addCSS = function(href) {
    return new Promise(function(resolve, reject) {
        var s = document.createElement('link')
        s.setAttribute('rel', 'stylesheet')
        s.setAttribute('type', 'text/css')
        s.setAttribute('href', href)
        s.onload = resolve(href)
        s.onerror = reject(href)
        document.getElementsByTagName('head').item(0).appendChild(s)
    })
}

/**
 * Creates a new DOM element.
 * @param {string} type The element name.
 * @param {string} className The element CSS class name.
 * @param {string} id The elemnt ID.
 * @param {object} attrs The element attributes.
 * @return {object} The newly created DOM element.
 */
let newDOMElement = function(type, className, id, attrs) {
    var e = document.createElement(type);
    if(className) {
        e.className = className;
    }
    if(id) {
        e.id = id;
    }
    if(typeof (attrs) === 'object') {
        Object.keys(attrs).forEach(function(key) {
            e.setAttribute(key, attrs[key]);
        });
    }
    return e;
};

export {addCSS, newDOMElement}
