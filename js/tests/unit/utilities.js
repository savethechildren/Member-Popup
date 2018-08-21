jQuery(function($) {
    QUnit.test('should successfully create and read a cookie', function(assert) {
        assert.expect(1);
        // set a test cookie with a random value
        var cookieValue = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        stc.util.setCookie('unit_test', cookieValue, 1);
        assert.equal(stc.util.getCookie('unit_test'), cookieValue, 'Cookie has the expected value');
    });

    QUnit.test('should successfully create a custom event and corresponding listener', function(assert) {
        assert.expect(1);
        // listen to custom event
        $(window).on('testEvent', function() {
            assert.ok(true, 'The event was dispatched correctly');
        });
        // dispatch event
        stc.util.createEvent('testEvent');
    });

    QUnit.test('should successfully create a DOM element', function(assert) {
        assert.expect(2);
        var newel = stc.util.newDOMElement('div', 'testClass', 'testID', {'data-test': 'dataTest'});
        $('body').append($(newel));
        var el = $('div#testID');
        assert.equal($(el).attr('class'), 'testClass', 'The class name is correct');
        assert.equal($(el).attr('data-test'), 'dataTest', 'The attribute is correct');
    });

    QUnit.test('should successfully add a script', function(assert) {
        assert.expect(1);
        var done = assert.async();
        stc.util.addScript('../../dist/js/stc-popup.js', function() {
            assert.ok(true, 'The script was loaded correctly');
            done();
        });
    });

    QUnit.test('should successfully add a stylesheet', function(assert) {
        assert.expect(1);
        var done = assert.async();
        stc.util.addCSS('../../dist/css/stc-popup.css', function() {
            assert.ok(true, 'The stylesheet was loaded correctly');
            done();
        });
    });
});
