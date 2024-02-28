// FILE SYSTEM & COMMAND LINE ARGS

// console.log(process.argv);

// console.log(process.argv[2]);

// In terminal: 'node app.js add'
/*
const command = process.argv[2];

console.log(process.argv);

if (command === "add") {
  console.log("Adding note!");
} else if (command === "remove") {
  console.log("Removing Note!");
}

// In terminal: node app.js add --title="This is first title"
// node app.js add --title="Things to buy"
// node app.js --version
*/

const yargs = require("yargs");

console.log(process.argsv);
console.log(yargs.argv);

// Customize yargs version
// yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
    },
  },
  handler: function (argv) {
    // console.log("Adding a new note!!!!!", argv);
    console.log("Title: " + argv.title);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a new note",
  handler: function () {
    console.log("Removing the note!!!!!");
  },
});

// add, remove,read, list
// console.log(yargs.argv);
yargs.parse();
