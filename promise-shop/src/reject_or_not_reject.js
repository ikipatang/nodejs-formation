var q = require('q');
var deferred = q.defer();

deferred.promise.then(console.log, console.log);


setTimeout(deferred.resolve, 300, "I FIRED");
setTimeout(deferred.resolve, 300, "I DID NOT FIRED");
