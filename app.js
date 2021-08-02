const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');


// create add commmand ------------------------
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

// create remove command ------------------------
yargs.command({
  command: 'remove',
  describe: 'Remove a note.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
})

// create a list command -------------------------
yargs.command({ 
  command: 'list',
  describe: 'Listing a note.',
  handler() {
    notes.listNotes();
  }
})

// create a read command -------------------------
yargs.command({
  command: 'read',
  describe: 'Read a note.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
})

// go through all the processes above and prints
yargs.parse();