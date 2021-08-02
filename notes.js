const chalk = require('chalk');
const fs = require('fs');


const getNote = () => {
  return 'Your notes....';
};

// add a note -----------------------------
const addNote = (title, body) => {
  const notes = loadNotes();
  // this method iterates all notes even if it finds a duplicate halfway
  // const duplicateNotes = notes.filter((note) => {
  //   return note.title === title
  // })
  // this method stops immediately when it finds a duplicate
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  })

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log(chalk.green('New note added successfully.'));
  } else {
    console.log(chalk.red('Note title taken!'));
  }
}

// remove a note ---------------------------
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => {
    return note.title != title;
  })

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red('Note not found!'));
  } else {
    console.log(chalk.green('Note removed successfully.'));
    saveNotes(notesToKeep);
  }
}

// list all notes ---------------------------
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow('Your notes...'));
  notes.forEach((note) => {
    console.log(note.title);
  })
}

// read a note -----------------------------
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => {
    return note.title === title;
  })

  if (note) {
    console.log(chalk.yellow(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red('Note not found!'));
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}


module.exports = {
  getNote: getNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};

