var stc = stc || {};
(function(geo){
    /**
     * The list of SC Member countries and their attributes.
     */
    geo.extendedMembers = {
        AU: {
            title: 'Australia',
            url: 'http://www.savethechildren.org.au',
        },
        CA: {
            title: 'Canada',
            url: 'http://www.savethechildren.ca',
        },
        CO: {
            title: 'Colombia',
            url: 'https://www.savethechildren.org.co',
        },
        DK: {
            title: 'Denmark',
            url: 'http://www.redbarnet.dk',
        },
        DO: {
            title: 'Dominican Republic',
            url: 'http://savethechildren.org.do',
        },
        FJ: {
            title: 'Fiji',
            url: 'http://www.savethechildren.org.fj',
        },
        FI: {
            title: 'Finland',
            url: 'http://www.pelastakaalapset.fi',
        },
        DE: {
            title: 'Germany',
            url: 'http://www.savethechildren.de',
        },
        GT: {
            title: 'Guatemala',
            url: 'http://www.savethechildren.org.gt',
        },
        HN: {
            title: 'Honduras',
            url: 'http://www.savethechildrenhonduras.org',
        },
        HK: {
            title: 'Hong Kong',
            url: 'http://www.savethechildren.org.hk',
        },
        IS: {
            title: 'Iceland',
            url: 'http://www.barnaheill.is',
        },
        IN: {
            title: 'India',
            url: 'http://www.savethechildren.in',
        },
        ID: {
            title: 'Indonesia',
            url: 'https://www.stc.or.id',
        },
        IT: {
            title: 'Italy',
            url: 'https://www.savethechildren.it/?utm_campaign=sci-website-redirect&utm_source=sci&utm_medium=display&utm_content=link',
        },
        JP: {
            title: 'Japan',
            url: 'http://www.savechildren.or.jp',
        },
        KR: {
            title: 'Korea',
            url: 'http://www.sc.or.kr',
        },
        LT: {
            title: 'Lithuania',
            url: 'https://www.gelbekitvaikus.lt',
        },
        MX: {
            title: 'Mexico',
            url: 'https://www.savethechildren.mx',
        },
        NL: {
            title: 'Netherlands',
            url: 'https://www.savethechildren.nl',
        },
        NZ: {
            title: 'New Zealand',
            url: 'http://www.savethechildren.org.nz',
        },
        NO: {
            title: 'Norway',
            url: 'http://www.reddbarna.no',
        },
        PH: {
            title: 'Philippines',
            url: 'http://www.savethechildren.org.ph',
        },
        RO: {
            title: 'Romania',
            url: 'http://www.salvaticopiii.ro',
        },
        ZA: {
            title: 'South Africa',
            url: 'https://www.savethechildren.org.za',
        },
        ES: {
            title: 'Spain',
            url: 'https://www.savethechildren.es',
        },
        SZ: {
            title: 'Swaziland',
            url: 'http://www.savethechildren.org.sz',
        },
        SE: {
            title: 'Sweden',
            url: 'https://www.raddabarnen.se',
        },
        CH: {
            title: 'Switzerland',
            url: 'https://www.savethechildren.ch',
        },
        GB: {
            title: 'UK',
            url: 'https://www.savethechildren.org.uk',
        },
        US: {
            title: 'U.S.',
            url: 'https://www.savethechildren.org?cid=Referral::POPUPwww.savethechildren.net::123199',
        },
        XX: {
            title: 'International',
            url: 'https://www.savethechildren.net',
        },
    }

    geo.prefix = function(country) {
        var lng = stc.modal.i18n[stc.geo.userLanguage.substr(0, 2)] ? stc.modal.i18n[stc.geo.userLanguage.substr(0, 2)] : stc.modal.i18n.default
        var prefix = ''
        if(['DO', 'GB', 'US', 'PH', 'NL'].indexOf(stc.geo.country) > -1) {
            prefix = lng.prefix
        }
        return prefix + country
    }

}(stc.geo = stc.geo || {}))
