// ASYNCHRONOUS BASICS
// aSYNCHRONOUS will run callback until the callstack is empty

console.log("Starting--------------");

setTimeout(() => {
  console.log("2 second timer");
}, 2000);

setTimeout(() => {
  console.log("0 second timer");
}, 0);

console.log("Stopping*****************");

// MAKING HTTP REQUESTS
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Api key: e28aadd728661d8c8689283a0693f8d2
