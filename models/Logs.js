const fs = require('fs');

class Logs {
  constructor(db, filename) {
    this.db = db;

    this.file = fs.createWriteStream(filename || `${process.env.NODE_ENV}_logs.log`, { flags: 'a' });
  }

  info(text) {
    this.log('info', text);
  }

  error(text) {
    this.log('error', text);
  }

  async log(level, text) {
    try {
      const date = new Date();
      this.file.write(`${level}: ${date}: ${text}\n`);
      await this.db.logs.create([level, text]);
      console[level](`${level}:`, text);
    } catch (e) {
      console.log('Error on log:', e.toString());
    }
  }
}

module.exports = Logs;
