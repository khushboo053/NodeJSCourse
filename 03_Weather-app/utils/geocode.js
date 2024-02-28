const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=4eefdedb8482ce32a0fe885d440577f3`;

  request({ url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect to that location services", undefined);
    } else if (body.message) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.coord.lat,
        longitude: body.coord.lon,
        location: body.name,
      });
    }
  });
};

module.exports = geocode;
