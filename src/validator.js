/**
 * A class that validate object of books
 */
class BookValidator {
  /**
 * Constructor
 * @param {object} name, ..., properties of book.
 * @param {string} action action from handler.
 */
  constructor({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }, action) {
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.reading = reading;
    this.action = action;
    this.pass;
    this.validationMessage;
  }

  /**
 * Method to validate the object
 */
  validate() {
    if (!this.name) {
      this.pass = false;
      this.validationMessage = 'Gagal ' + this.action +
            ' buku. Mohon isi nama buku';
    } else if (this.readPage > this.pageCount) {
      this.pass = false;
      this.validationMessage = 'Gagal ' + this.action +
            ' buku. readPage tidak boleh lebih besar dari pageCount';
    } else {
      this.pass = true;
      this.validationMessage = 'Passed';
    }
  }

  /**
 * Add two numbers.
 * @return {boolean} Is validation pass or not.
 */
  isPass() {
    return this.pass;
  }

  /**
 * Get message from validation
 * @return {string} message of validation.
 */
  getMessage() {
    return this.validationMessage;
  }

  /**
 * Get clean data from validation
 * @return {object} book properties.
 */
  getCleanData() {
    return {
      name: this.name,
      year: this.year,
      author: this.author,
      summary: this.summary,
      publisher: this.publisher,
      pageCount: this.pageCount,
      readPage: this.readPage,
      finished: this.pageCount === this.readPage,
      reading: this.reading,
    };
  }
}

module.exports = {
  BookValidator,
};
