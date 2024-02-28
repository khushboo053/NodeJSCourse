/*
setTimeout(() => {
  console.log("5 second up");
}, 5000);

const names = ["Andrew", "Jess", "Jen", "Em"];
const shortNames = names.filter((name) => {
  return name.length <= 4;
});

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };
    callback(data);
  }, 2000);
};

geocode("Philadelphia", (data) => {
  console.log(data);
});
*/

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// If we do not pass callback function as argument then it will throw error because JavaScript is asynchronous and does not wait for the response of the function & also this add function do not directly retutn something
// const add = (n1, n2, callback) => {
//   setTimeout(() => {
//     callback(n1 + n2);
//   }, 3000);
// };

// add(1, 4, (sum) => {
//   console.log(sum); // Should print: 5
// });

const doCallbackWork = (callback) => {
  setTimeout(() => {
    // callback("This is my error!", undefined);
    callback(undefined, [1,4,7])
  }, 2000);
};

doCallbackWork((error, result) => {
  if (error) {
    console.log(error);
  }
  console.log(result);
});
