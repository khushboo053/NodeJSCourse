//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4eefdedb8482ce32a0fe885d440577f3`;

  request({ url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect to that location services", undefined);
    } else if (body.message) {
      callback("Unable to find location. Try seacrh another!", undefined);
    } else {
      callback(undefined, {
        windSpeed: body.wind.speed,
        windDeg: body.wind.deg
      });
    }
  });
};

module.exports = forecast;
