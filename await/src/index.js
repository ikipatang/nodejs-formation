var RP = require("request-promise");

async function test() {
  var sites = await Promise.all([RP("http://www.google.com")]).then((data) => {
    console.log(data);
  })
}

test();

// const timeout = function (delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve()
//     }, delay)
//   })
// }
//
// async function timer () {
//   console.log('timer started')
//   await Promise.resolve(timeout(100));
//   console.log('timer finished')
// }
//
// timer()
