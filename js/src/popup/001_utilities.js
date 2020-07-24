var stc = stc || {};
(function(util){

    /**
     * Checks if a given object already exists or waits for the relevant event
     * before firing a callback function.
     *
     * @param {object} object The object to validate..
     * @param {string} event The event to listen for in case the object doesn't exist.
     * @param {function} callback The callback function to execute.
     */
    util.waitForObjectOrEvent = function(object, event, callback) {
        if(object) {
            callback()
        } else {
            window.addEventListener(event, callback)
        }
    }

    /**
     * Adds a stylesheet and calls back when complete.
     * @param {string} href The URL of the stylesheet.
     * @param {function} callback The callback function.
     */
    util.addCSS = function(href, callback) {
        var s = document.createElement('link')
        s.setAttribute('rel', 'stylesheet')
        s.setAttribute('type', 'text/css')
        s.setAttribute('href', href)
        s.onload = callback
        document.getElementsByTagName('head').item(0).appendChild(s)
    }

    /**
     * Adds a script and calls back when complete.
     * @param {string} src The URL of the script.
     * @param {function} callback The callback function.
     */
    util.addScript = function(src, callback) {
        var s = document.createElement('script')
        s.src = src
        s.async = false
        s.onload = callback
        document.body.appendChild(s)
    }

    /**
     * Creates a new DOM element.
     * @param {string} type The element name.
     * @param {string} className The element CSS class name.
     * @param {string} id The elemnt ID.
     * @param {object} attrs The element attributes.
     * @return {object} The newly created DOM element.
     */
    util.newDOMElement = function(type, className, id, attrs) {
        var e = document.createElement(type)
        if(className) {
            e.className = className
        }
        if(id) {
            e.id = id
        }
        if(typeof (attrs) === 'object') {
            Object.keys(attrs).forEach(function(key) {
                e.setAttribute(key, attrs[key])
            })
        }
        return e
    }

    /**
     * Loads the URL into an anchor DOM element.
     * @param {string} url The URL to parse.
     * @return {Element} The anchor element.
     */
    util.loadURLNode = function(url) {
        var urlParsingNode = document.createElement('a')
        var href = url
        if (util.msie) {
            // Normalize before parse.  Refer Implementation Notes on why this is
            // done in two steps on IE.
            urlParsingNode.setAttribute('href', href)
            href = urlParsingNode.href
        }
        urlParsingNode.setAttribute('href', href)
        return urlParsingNode
    }

    /**
     * Adds UTM tracking code to a given URL.
     * @param {string} url The URL to add tracking to.
     * @param {string} source The UTM source.
     * @param {string} medium The UTM medium.
     * @param {string} campaign The UTM campaign.
     * @return {string} The updated URL.
     */
    util.addUTM = function(url, source, medium, campaign) {
        var params = util.parseURLParams(url)
        if(params.utm_source) {
            return url
        }
        let urlParsingNode = util.loadURLNode(url)

        let queryString = '&utm_source=' + source + '&utm_medium=' + medium + '&utm_campaign=' + campaign
        if(urlParsingNode.search) {
            urlParsingNode.search += queryString
        } else {
            urlParsingNode.search = '?' + queryString.substr(1)
        }
        return urlParsingNode.href
    }

    /**
     * Parses the current URL search string into key value pairs.
     * @param {string} [url=location.href] The URL to parse. Defaults to the current url.
     * @return {object} The key/value pairs of URL paramaters.
     */
    util.parseURLParams = function(url) {
        url = url || location.href
        var parsedParameters = {}
        url = util.parseURL(url)
        if(url.search && url.search.length > 0) {
            var uriParameters = url.search.split('&')
            $.each(uriParameters, function(i, v) {
                var parameter = v.split('=')
                if(parameter.length === 2) {
                    parsedParameters[parameter[0]] = decodeURIComponent(parameter[1])
                }
            })
        }
        return parsedParameters
    }

}(stc.util = stc.util || {}))
