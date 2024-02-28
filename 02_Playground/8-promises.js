// In this function, we can either call resolve or reject
/*
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([1, 2, 3]);
    reject("Things went wrong!");
    reject("New Error");
  }, 3000);
});

doWorkPromise
  .then((result) => {
    console.log("Success!", result);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
*/

//
//                              Fulfilled
//                            /
// Promise  ----- Pending -->
//                            \
//                              rejected
//

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// The more Async tasks we perform, the code gets more complex
// add(1, 2)
//   .then((sum) => {
//     console.log(sum);

//     add(sum, 5)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((e) => console.log(e));
//   })
//   .catch((e) => console.log(e));

// PROMISE CHAINING

add(1, 1)
  .then((sum) => {
    console.log(sum);
    return add(sum, 5);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => console.log(e));
