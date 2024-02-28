// ASYNC / AWAIT
// Async Functions always return a promise, Promise is fulfilled with the value a developer choose to return from a function

// const doWork = async () => {};
// console.log(doWork()); // Promise { undefined }

/*
const doWork = async () => {
  throw new Error("Something went wrong!");
  // Its not a string, its a promise thats fullfilled with a string
  return "Khushboo";
};
// console.log(doWork()); // Promise { 'Khushboo' }
*/

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (a < 0 || b < 0) {
            return reject('Numbers msut be positive');
        }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

doWork()
  .then((result) => {
    console.log(result);
  })
  .catch((e) => console.log(e));
