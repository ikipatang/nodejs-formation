var http = require('http'),
    async = require('async');

// process.argv[2] = 'http://baconipsum.com/api/?type=meat-and-filler';
// process.argv[3] = 'http://baconipsum.com/api/?type=meat-and-filler';

async.map(process.argv.slice(2), function(item, done) {
    fetchURL(item, done);
}, function(err) {
    if (err) {
        return console.log(err);
    }
});

function fetchURL(url, done) {
    var body = '';

    http.get(url, function(res) {
        res.on('data', function(chunk) {
            body += chunk.toString();
        });

        res.on('end', function(chunk) {
            done(null);
        });
    }).on('error', function(e) {
        done(e);
    });
}
