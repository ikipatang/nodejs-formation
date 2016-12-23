var http = require('http'),
    async = require('async');


// process.argv[2] = 'http://baconipsum.com/api/?type=meat-and-filler';
// process.argv[3] = 'http://baconipsum.com/api/?type=meat-and-filler';

async.series({
    requestOne: function(done) {
        fetchURL(process.argv[2], done);
    },
    requestTwo: function(done) {
        fetchURL(process.argv[3], done);
    }
}, function(err, result) {
    if (err)
        return console.error(err);
    console.log(result);
});

function fetchURL(url, done) {
    var body = '';
    http.get(url, function(res) {
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
