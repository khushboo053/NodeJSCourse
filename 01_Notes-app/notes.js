// CHALLENGE : DEFINE & USE A FUNCTION IN A NEW FILE
// const getNotes = () => console.log("Hello Everyone from notes!!!");
// In terminal run command: node app.js add --title="T" --body="B"

const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "Your Notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();

  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title;
  // });

  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  
  // console.log(duplicateNote);
  // console.log(title);
  
  // if (duplicateNotes.length === 0) {
    debugger;
    if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note Added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // const notesToKeep = notes.filter(function (note) {
  //   return note.title !== title;
  // });

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No Note Found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note Not found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

// DEBUGGING
// In terminal: node inspect app.js --title="Courses" --body="MongoDb.js"
// If above gives error: node --inspect-brk app.js --title="Courses" --body="MongoDb.js"

// Then, In Edge: search for this: edge://inspect/#devices
// Click on inspect
