/**
 * The list of available tracker names.
 */
const trackers = []

/**
 * Checks that Google Analytics is initialized
 *   and sets the available tracker names.
 * @return {bool} True if GA is available or false.
 */
const isOn = () => {
    if (window.ga && ga.create) {
        const gaTrackers = ga.getAll()
        gaTrackers.forEach((v) => {
            if(v.get('trackingId') !== '') {
                trackers.push(v.get('name'))
            }
        })
        return true
    }
    return false
}

/**
 * Sends an event to GA.
 *
 * @param {string} category The event category.
 * @param {string} action The action to record.
 * @param {string} [label] The event label.
 * @param {function} [callback] The callback event if needed.
 * @return {bool} False if not needed.
 */
const sendEvent = (category, action, label, callback) => {
    if(!category || !action || !label) {
        return false
    }
    trackers.forEach((v) => {
        ga(`${v}.send`, {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label || '',
            hitCallback: callback || '',
        })
    })
    return true
}

export {
    isOn, sendEvent, trackers,
}
