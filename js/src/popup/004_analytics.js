var stc = stc || {};
(function(analytics){

    /**
     * The list of available tracker names.
     */
    analytics.trackers = [];

    /**
     * Checks that Google Analytics is initialized
     *   and sets the available tracker names.
     * @return {bool} True if GA is available or false.
     */
    analytics.isOn = function() {
        if (window.ga && ga.create) {
            var gaTrackers = ga.getAll();
            gaTrackers.forEach(function(v) {
                if(v.get('trackingId') !== '') {
                    analytics.trackers.push(v.get('name'));
                }
            });
            return true;
        } else {
            return false;
        }
    };

    /**
     * Sends an event to GA.
     *
     * @param {string} category The event category.
     * @param {string} action The action to record.
     * @param {string} [label] The event label.
     * @param {function} [callback] The callback event if needed.
     * @return {bool} False if not needed.
     */
    analytics.sendEvent = function(category, action, label, callback) {
        if(!category || !action || !label) {
            return false;
        }
        analytics.trackers.forEach(function(v) {
            ga(v + '.' + 'send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label || '',
                hitCallback: callback || '',
            });
        });
    };

}(stc.analytics = stc.analytics || {}));
