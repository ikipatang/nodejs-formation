
var fs = require('fs'),
    http = require('http'),
    async = require('async');

// process.argv[2] = '/home/devtemando/workspace/nodejs/formation/async-you/src/test.txt';

var filePath = process.argv[2];


async.waterfall([
    function(done) {
        fs.readFile(filePath, function(err, data) {
            if (err) return done(err);
            done(null, data)
        });
    },

    function(data, done) {
        var body = '';
        http.get(data.toString().trimRight(), function(res) {
            res.on('data', function(chunk) {
                body += chunk.toString();
            });

            res.on('end', function(chunk) {
                done(null, body);
            });
        }).on('error', function(e) {
            done(e);
        });
    }
], function(err, result) {
    if (err) return console.error(err);
    console.log(result);
});
