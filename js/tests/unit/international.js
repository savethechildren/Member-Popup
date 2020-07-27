jQuery(function($) {

    QUnit.test('should return a valid country code for the user', function(assert) {
        if(stc.geo.country) {
            assert.ok(/^[A-Z][A-Z]$/.test(stc.geo.country), 'The country ISO code was set correctly to ' + stc.geo.country)
            return true
        }
        var done = assert.async()
        window.addEventListener('countryIsSet', function() {
            assert.ok(/^[A-Z][A-Z]$/.test(stc.geo.country), 'The country ISO code was set correctly to ' + stc.geo.country)
            done()
        })
    })

})
