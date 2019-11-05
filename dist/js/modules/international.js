import * as util from './utilities.js'

let country = ''
let userLanguage ='en-US'

/**
 * Locate the visitor by IP.
 *
 * @desc Uses Skype API to retrieve user's country ISO code and set a country cookie.
 *
 * @return {string} 2-letter country ISO code (if set)
 */
let locate = function() {

    return new Promise(function(resolve, reject) {
        country = ''
        country = util.getCookie('stc_country')
        if(typeof country === 'undefined' || country === ''){
            util.jsonp('https://cfwk.savethechildren.ngo/api/geo/country?callback=setCountry', {
                callbackName: 'setCountry',
                onSuccess: function(json){
                    window.stc.geo.country = json.country_code
                    util.setCookie('stc_country', json.country_code, 14, util.getDomain(window.location.hostname))
                    resolve(country)
                },
                onTimeout: function(){
                    //do nothing
                },
                timeout: 5
            })
        } else {
            resolve(country)
        }

    })

}

/**
 * Sets the user language variable and cookie.
 * @param {string} [lng] The two-letter language code.
 *   Defaults to the main browser language or the user-set value if present.
 * @return {String} The language code.
 */
let setUserLanguage = function(lng) {
    if(!lng) {
        lng = util.getCookie('stc_user_language') || (navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage)
    }
    if(lng.length < 2) {
        return false
    }
    util.setCookie('stc_user_language', lng, 14, util.getDomain(window.location.hostname))
    userLanguage = lng
    return lng
}

/**
 * The list of recognized country Members.
 */
let members = ['AU', 'CA', 'CH', 'CO', 'DE',
    'DK', 'DO', 'ES', 'FI', 'FJ', 'GB', 'GT',
    'HK', 'HN', 'ID', 'IN', 'IS', 'IT', 'JP',
    'KR', 'LT', 'MX', 'NL', 'NO', 'NZ', 'PH',
    'RO', 'SE', 'SZ', 'US', 'ZA',
]

/* Initialise some variables on page load */
setUserLanguage()
locate()

export {locate, country, members, setUserLanguage, userLanguage}
