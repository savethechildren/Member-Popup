var stc = stc || {};
(function(analytics){
    analytics.isOn = function() {
        return (window.ga && ga.create ? true : false);
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
        ga('send', {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: (label ? label : ''),
            hitCallback: analytics.callback
        });
    };

}(stc.analytics = stc.analytics || {}));
