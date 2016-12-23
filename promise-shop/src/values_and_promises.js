var q = require('q');
var deferred = q.defer();

deferred.promise
  .then(attachTitle)
  .then(console.log);

deferred.resolve('MANHATTAN');


function attachTitle(string){
  return string = 'DR. '+string;
}
