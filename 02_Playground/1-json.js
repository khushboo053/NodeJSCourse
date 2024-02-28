const fs = require("fs");

const book = {
  title: "Ego is the enemy",
  author: "Ryan Holiday",
};

/*
// Converting JS object book into json
// It converts all single quotes into double quotes
const bookJSON = JSON.stringify(book);
console.log(bookJSON); // bookJSON is a string & not an object
console.log(bookJSON.title); // undefined coz book object has title property & not bookJSON

const parsedData = JSON.parse(bookJSON);
console.log(parsedData.author); // parsedData is indeed a JS object

// JSON.stringify = Convert object to JSON
// JSON.parse = Convert JSON to object
*/

const bookJSON = JSON.stringify(book);
fs.writeFileSync("1-json.json", bookJSON);

const dataBuffer = fs.readFileSync("1-json.json"); // Binary data
const dataJSON = dataBuffer.toString(); // string data
const data = JSON.parse(dataJSON); // object data

console.log(data.title);
console.log(typeof data); // Object
console.log(dataJSON);
console.log(dataBuffer);
