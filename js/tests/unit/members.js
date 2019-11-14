jQuery(function($) {

    QUnit.test('should show the number of Member countries', function(assert) {
        assert.ok(Object.keys(stc.geo.members).length > 0, 'Member object has ' + Object.keys(stc.geo.members).length + ' entries')
    })

})
