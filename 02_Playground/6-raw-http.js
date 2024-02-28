const https = require("https");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=-75.7088&lon=44.1545&appid=4eefdedb8482ce32a0fe885d440577f3";

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    // console.log(chunk);
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
