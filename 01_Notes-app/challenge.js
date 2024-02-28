// CHALLENGE -1
// Add 2 new commands ('list', 'read')

const yargs = require("yargs");

yargs.command({
  command: "list",
  describe: "listing....",
  handler: function () {
    console.log("Listing the note!!!!");
  },
});

yargs.command({
  command: "read",
  describe: "Reading note",
  handler: function () {
    console.log("Reading a new note!!!!!");
  },
});
console.log(yargs.argv);

// CHALLENGE - 2
// Add an option to yargs
// 1. Setup a body option for add command
// 2.Configure a description, make it required, and for it to be a string
// 3.Log the body value in the handler function
// 4.Test your work!

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    // console.log("Adding a new note!!!!!", argv);
    console.log("Title: " + argv.title);
    console.log("Body: " + argv.body);
  },
});

console.log(yargs.argv);

// CHALLENGE - 3
// 1. Setup remove command option to take a required "title" option
// 2. Create & export removeNote function from notes.js
// 3. Call removeNote in remove command handler
// 4. Have removeNote log the titleof the note to be removed

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

// CHALLENGE - 4
// 1. Load existing notes
// 2. use array filter method to remove matching note (if any)
// 3. Save the newly created array
/*
const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });
  saveNotes(notesToKeep);
};
*/

// CHALLENGE - 5 USE CHALK
// 1. If note is removed, print with green bg
// 2. If no note is removed, print with red bg

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No Note Found!"));
  }
};

// CHALLENEGE-6
// 1. If function is a method, use ES6 method definition syntax
// 2. Otherwise, use most concise arrow function possible
