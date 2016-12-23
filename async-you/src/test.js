var http = require('http'),
    async = require('async');

var url = process.argv[2];

/*
Write a program that will receive a single command line argument to a URL.

Using async.whilst and http.get, send GET requests to this URL until
the response body contains the string "meerkat".

console.log the amount of GET requests needed to retrieve the "meerkat" string.
*/

var requestBody = '';
var count = 0;

async.whilst(function() {
    return !/meerkat/.test(requestBody.trim());
}, function(done) {
    var body = '';
    http.get(process.argv[2], function(res) {
        res.on('data', function(chunk) {
            body += chunk.toString();
        });

        res.on('end', function() {
            ++count;
            requestBody = body;
            done();
        });
    }).on('error', done);
}, function(err) {
    if (err)
        return console.log(err);
    console.log(count);
})
