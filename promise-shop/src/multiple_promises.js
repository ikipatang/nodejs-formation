var q = require('q');

var deferred1 = q.defer();
var deferred2 = q.defer();

function all(promise1, promise2) {
    var deferred = q.defer();
    var cpt = 0;
    var out = [];

    promise1.then(function(val) {
        out[0] = val;
        cpt++;

        if (cpt >= 2) {
          deferred.resolve(out)
        }
    })
    .then(null, deferred.reject)
    .done();;

    promise2.then(function(val) {
        out[1] = val;
        cpt++;

        if (cpt >= 2) {
          deferred.resolve(out)
        }
    })
    .then(null, deferred.reject)
    .done();;

    return deferred.promise;
}

all(deferred1.promise, deferred2.promise)
    .then(console.log)
    .done();

setTimeout(deferred1.resolve, 200, "PROMISES");
setTimeout(deferred2.resolve, 200, "FTW");
