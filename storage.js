'use static';

const Sanitizer = require('sanitizer');


class Storage {
  constructor() {
    this.password = '';
  }

  setPassword(incoming) {
    this.password = Sanitizer.sanitize(incoming);
  }

  getPassword() {
    return this.password;
  }
}

module.exports = Storage;
