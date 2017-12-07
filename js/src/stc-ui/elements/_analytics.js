var stc = stc || {};

window.addEventListener('load', function(){
    window.removeEventListener('load', this, false);
    if(!window.ga || !ga.create) { 
        return false;
    }
       
    (function(analytics, ga, $){

        /**
         * Gets a GA property by wrapping ga.getAll();
         * @param {string} property The properry to retrieve.
         * @return {unresolved} The GA property if found.
         */
        analytics.getProperty = function(property) {
            return ga.getAll()[0].get(property);
        };
        
        analytics.trackingId = analytics.getProperty('trackingId');
        
        /**
         * Registers a GA ecommerce transaction for a donation.
         * 
         * @param {string} trans_id The transaction ID.
         * @param {string} item_name The product name.
         * @param {string} item_sku The product SKU.
         * @param {number} amount The donation amount.
         * @param {string} currency The three-letter currency code.
         * @return {undefined}
         */
        analytics.sendDonation = function(trans_id, item_name, item_sku, amount, currency) {
            if(!trans_id || !item_name || !item_sku || isNaN(amount)) {
                return false;
            }
            currency = currency || "USD";
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': trans_id,
                'affiliation': stc.geo.t('Save the Children'),
                'revenue': amount,
                'currency': currency
            });
            ga('ecommerce:addItem', {
                'id': trans_id,
                'name': item_name,
                'sku': item_sku,
                'category': stc.geo.t('Donation'),
                'price': amount,
                'quantity': '1',
                'currency': currency
            });
            ga('ecommerce:send');
        };
        
        /* Check if a transaction object exists on the page and send it to ga */
        if(analytics.donation && analytics.donation.trans_id) {
            var params = Object.keys(analytics.donation).map(function (key) { return analytics.donation[key]; });
            analytics.sendDonation.apply(this, params);
        }
        
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
        
        /**
         * Sends a page view to GA.
         * 
         * @param {string} [url] The path to record a view against.
         *   Defaults to current path.
         * @return {undefined}
         */
        analytics.sendPageView = function (url) {
            var url = url || location.pathname;
            ga('send', 'pageview', url, {hitCallback: analytics.callback});
        };
        
        /* Callback is only used for unit testing */
        analytics.callback = function() {
            analytics.lastEventTime = new Date().getTime();
        };
        
        /* Add some default event tracking on DOM ready */
        $(function() {
            /* Track events on buttons with a data-event attribute */
            $('button[data-event]').on('click', function() {
                analytics.sendEvent($(this).attr('data-event'), 'click', $(this).text());
            });
            
            /* Track events for custom event, outbound and download links */
            $('a').on('click', function() {
                var url = $(this).attr('href');
                // Custom event is specified in data-event
                if($(this).attr('data-event')) {
                    analytics.sendEvent($(this).attr('data-event'), 'click', url);
                }
                // Link is a file download
                else if (stc.util.isFileURL(url)) {
                    analytics.sendEvent('Download', 'click', url);
                }
                // Link is outbound
                else if(!stc.util.isLocalURL(url)) {
                    analytics.sendEvent('Outbound link', 'click', url);
                }
            });
        });

    }(stc.analytics = stc.analytics || {}, ga, jQuery));

});
