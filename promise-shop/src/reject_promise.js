var q = require('q');
var deferred = q.defer();

function failMethod(errMsg){
  console.log(errMsg);
}

deferred.promise.then(null, failMethod);

setTimeout(deferred.reject, 300, "REJECTED!");
