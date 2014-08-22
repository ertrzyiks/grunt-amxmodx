'use strict';

var grunt = require('grunt'),
    fs = require("fs");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.amxmodx = {
    default_settings: function (test) {
        test.strictEqual(
            true,
            fs.existsSync("tmp/amxmodx-1.8.2/testing.amxx"),
            'compiled plugin with 1.8.2 should be saved in tmp/ folder'
        );

        test.done();
    },
  
    custom_settings: function (test) {
        test.strictEqual(
            true,
            fs.existsSync("tmp/amxx/amxmodx-1.8.1/testing.amxx"),
            'compiled plugin with 1.8.1 should be saved in tmp/amxx folder'
        );
        test.strictEqual(
            true,
            fs.existsSync("tmp/amxx/amxmodx-1.8.2/testing.amxx"),
            'compiled plugin with 1.8.2 should be saved in tmp/amxx/ folder'
        );

        test.done();
    }
};
