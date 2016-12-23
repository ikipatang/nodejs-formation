var q = require('q');

q.fcall(iterate, 1)
    .then(iterate)
        .then(iterate)
            .then(iterate)
                .then(iterate)
                    .then(iterate)
                        .then(iterate)
                            .then(iterate)
                                .then(iterate)
                                    .then(iterate)
    .then(null, console.log)
    .done();

function throwMyGod(){
  throw new Error('OH NOES')
}

function iterate(number){
  console.log(number);
  if(number == 5){
    throwMyGod();
  }
  return ++number;
}
