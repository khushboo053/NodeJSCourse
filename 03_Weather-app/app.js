// HTTP REQUESTS
// For weather Api: openweather.com
// For Geocoding: Mapbox.com
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/*
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=${process.env.GEOCODE_API_KEY}";

request({ url: url, json: true }, (err, res) => {
  console.log(`Its current temperature is ${res.body.main.temp}. It feels like ${res.body.main.feels_like}`);
  console.log(`Its weather description is ${res.body.weather[0].description}`);
});
*/

// Geocoding
// Address -> Lat/Long -> Weather
/*
const geocodeUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${process.env.GEOCODE_API_KEY}";
request({ url: geocodeUrl, json: true }, (err, res) => {
  // console.log(`Here are 5 data of ${res.body.name}`);
  // console.log(res.body[0].country);
  if (err) {
    console.log("Unable to connect to location services");
  } else if (res.body.length === 0) {
    console.log("Unable to find location. Try another search!!");
  } else {
    const latitude = res.body[2].lat;
    const longitude = res.body[2].lon;
    const country = res.body[2].country;
    const state = res.body[2].state;

    console.log(
      `Latitude & Longitude of ${state} in ${country} is ${latitude} and ${longitude}.`
    );
  }
});
*/

/*
geocode("Surat", (err, data) => {
  console.log("Error: ", err);
  console.log("Data: ", data);
});


forecast(-75.7088, 44.1545, (err, data) => {
  console.log('Error', err)   
  console.log('Data', data)
})
*/

// Goal: Accept location via command line argument
// 1. Access the command line args without yargs
// 2. Use the string value as the input for geocode
// 3. Only geocode if a location was provided

// In Terminal run this: node app.js Surat

const address = process.argv[2];

if (!address) {
  console.log("Plz provide an address");
}

geocode(address, (err, { latitude, longitude, location}) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);

  forecast(latitude, longitude, (err, forecastData) => {
    if (err) {
      return console.log(err);
    }
    console.log(location);
    console.log(forecastData);
  });
});
