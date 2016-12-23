var http = require('http'),
    async = require('async');

// Pretend this is some complicated async factory
var createUser = function(id, callback) {
    callback(null, {
        user_id: ++id
    });
};

async.series({
    post: function(done) {
        async.times(5, function(n, next) {
            createUser(n, function(err, user) {
                var opts = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    hostname: process.argv[2],
                    port: process.argv[3],
                    path: '/users/create',
                    method: 'POST'
                };
                postUrl(opts, user, next);
            });
        }, function(err, result) {
            if (err) {
                return console.error(err);
            }
            done();
        })
    },
    get: function(done) {
        var opts = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            hostname: process.argv[2],
            port: process.argv[3],
            path: '/users',
            method: 'GET'
        };
        fetchURL(opts, done);
    }
}, function(err, result) {
    if (err) {
        return console.error(err);
    }
    console.log(result.get);
});

function fetchURL(opts, done) {
    var body = '';

    http.get(opts, function(res) {
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

function postUrl(opts, user, done) {
    var req = http.request(opts, function(res) {
          res.on('end', function() {
              done();
          });
    });
    req.on('error', done);

    // write data to request body
    req.write(JSON.stringify(user));
    req.end();
    done();
}
