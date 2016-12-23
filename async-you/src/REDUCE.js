
/*
Write a program that will receive an URL as the first command line argument.

To this URL, for each of the values in the following array, send a GET request
using http.get with a query parameter named number set at the proper value:

    ['one', 'two', 'three']

Each time, convert the response body to Number and add it to the previous value.
console.log the final reduced value.
*/

var http = require('http'),
    async = require('async');

async.reduce([
    'one', 'two', 'three'
], 0, function(memo, item, callback) {
    var body = '';

    http.get(process.argv[2] + "?number=" + item, function(res) {
        res.on('data', function(chunk) {
            body += chunk.toString();
        });

        res.on('end', function() {
            callback(null, memo + Number(body));
        });
    }).on('error', callback);

}, function(err, result) {
    if (err)
        return console.log(err);
    console.log(result);
});
