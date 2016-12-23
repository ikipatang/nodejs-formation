var qhttp = require('q-io/http');

var sessionCache = 'http://localhost:7000/';
var db = 'http://localhost:7001/';

qhttp.read(sessionCache)
    .then(function(id) {
        return qhttp.read(db + id);
    })
    .then(function(json) {
        console.log(JSON.parse(json));
    })
    .then(null, console.error)
    .done();
