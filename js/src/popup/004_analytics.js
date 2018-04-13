var stc = stc || {};
(function(analytics){

    /**
     * The list of available tracker names.
     */
    analytics.trackers = [];

    /**
     * Checks that Google Analyutics is initialized 
     * and sets the avilable tracker names.
     * @return {bool} True if GA is available or false.
     */
    analytics.isOn = function() {
        if (window.ga && ga.create) {
            var gaTrackers = ga.getAll();
            gaTrackers.forEach(function(v) {
                if(v.get('trackingId') !== "") {
                    analytics.trackers.push(v.get('name'));
                }
            });
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Sends an event to GA.
     * 
     * @param {type} category The event category.
     * @param {type} action The action to record.
     * @param {type} [label] The event label.
     * @return {undefined}
     */
    analytics.sendEvent = function (category, action, label) {
        if(!category || !action || !label) {
            return false;
        }
        analytics.trackers.forEach(function(v) {
            ga(v + '.' + 'send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: (label ? label : ''),
                hitCallback: analytics.callback
            });
        });        
    };

}(stc.analytics = stc.analytics || {}));
