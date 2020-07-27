import * as util from './utilities.js'

let country = ''

/**
 * Sets the user language variable and cookie.
 * @param {string} [lng] The two-letter language code.
 *   Defaults to the main browser language or the user-set value if present.
 * @return {String} The language code.
 */
function setUserLanguage(lng) {
    let language = 'en-US'
    if(!lng) {
        language = util.getCookie('stc_user_language') || (navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage)
    } else {
        language = lng
    }
    if(language.length < 2) {
        return false
    }
    util.setCookie('stc_user_language', language, 14, util.getDomain(window.location.hostname))
    stc.geo.userLanguage = language
    return language
}

/**
 * Locate the visitor by IP.
 *
 * @desc Uses Skype API to retrieve user's country ISO code and set a country cookie.
 *
 * @return {string} 2-letter country ISO code (if set)
 */
function locate() {
    return new Promise((resolve) => {
        country = util.getCookie('stc_country')
        if(typeof country === 'undefined' || country === '') {
            util.jsonp('https://cfwk.savethechildren.ngo/api/geo/country?callback=setCountry', {
                callbackName: 'setCountry',
                onSuccess: (json) => {
                    window.stc.geo.country = json.country_code
                    util.setCookie('stc_country', json.country_code, 14, util.getDomain(window.location.hostname))
                    setUserLanguage(json.user_language)
                    resolve(country)
                },
                onTimeout: () => {
                    // do nothing
                },
                timeout: 5,
            })
        } else {
            window.stc.geo.country = country
            setUserLanguage()
            resolve(country)
        }
    })
}

/**
 * The list of recognized country Members.
 */
const members = ['AU', 'CA', 'CH', 'CO', 'DE',
    'DK', 'DO', 'ES', 'FI', 'FJ', 'GB', 'GT',
    'HK', 'HN', 'ID', 'IN', 'IS', 'IT', 'JP',
    'KR', 'LT', 'MX', 'NL', 'NO', 'NZ', 'PH',
    'RO', 'SE', 'SZ', 'US', 'ZA',
]

export {
    locate, country, members, setUserLanguage,
}
