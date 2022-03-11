const {nanoid} = require('nanoid');
const books = require('./books');
const {BookValidator} = require('./validator');
const {ValidationError} = require('./error');

const BookHandler = {};

BookHandler.addBookHandler = (request, h) => {
  let responseCode = 201; // Default response code
  const responseBody = {};

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  try {
    const book = request.payload;

    const validator = new BookValidator(book, 'menambahkan');
    validator.validate();

    if (!validator.isPass()) {
      throw new ValidationError(validator.getMessage(), 'fail');
    }

    const newBook = validator.getCleanData();
    books.push({
      id,
      ...newBook,
      insertedAt,
      updatedAt,
    });

    const isSucces = books.filter((book) => book.id === id).length > 0;
    if (isSucces) {
      responseBody.status = 'success';
      responseBody.message = 'Buku berhasil ditambahkan';
      responseBody.data = {
        bookId: id,
      };
    } else {
      throw new Error();
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      responseCode = 400;
      responseBody.status = error.status;
      responseBody.message = error.message;
    } else {
      responseCode = 500;
      responseBody.status = 'error';
      responseBody.message = 'Buku gagal ditambahkan';
    }

    return h.response(responseBody).code(responseCode);
  }

  return h.response(responseBody).code(responseCode);
};

BookHandler.getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let booksResult = books;

  if (name) {
    booksResult = booksResult.
        filter((book) => book.name.toLowerCase().match(name.toLowerCase()));

    if (reading) {
      booksResult = booksResult.
          filter((book) => Number(book.reading) == Number(reading));
    } else if (finished) {
      booksResult = booksResult.
          filter((book) => Number(book.finished) == Number(finished));
    }
  } else if (reading) {
    booksResult = booksResult.
        filter((book) => Number(book.reading) == Number(reading));
  } else if (finished) {
    booksResult = booksResult.
        filter((book) => Number(book.finished) == Number(finished));
  }

  return h.response({
    status: 'success',
    data: {
      books: booksResult.map((book) => (
        {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }
      )),
    },
  }).code(200);
};

BookHandler.getBookByIdHandler = (request, h) => {
  let responseCode = 200; // Default response code
  const responseBody = {};
  const {id} = request.params;

  const book = books.filter((book) => book.id === id)[0];
  if (book) {
    responseBody.status = 'success';
    responseBody.data = {
      book,
    };
  } else {
    responseCode = 404;
    responseBody.status = 'fail';
    responseBody.message = 'Buku tidak ditemukan';
  }

  return h.response(responseBody).code(responseCode);
};

BookHandler.editBookByIdHandler = (request, h) => {
  let responseCode = 200; // Default response code
  const responseBody = {};
  const {id} = request.params;

  try {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      const book = request.payload;
      const validator = new BookValidator(book, 'memperbarui');
      validator.validate();

      if (!validator.isPass()) {
        throw new ValidationError(validator.getMessage(), 'fail');
      }

      const updatedBook = validator.getCleanData();
      const updatedAt = new Date().toISOString();
      books[index] = {
        ...books[index],
        ...updatedBook,
        updatedAt,
      };
      responseBody.status = 'success';
      responseBody.message = 'Buku berhasil diperbarui';
    } else {
      responseCode = 404;
      responseBody.status = 'fail';
      responseBody.message = 'Gagal memperbarui buku. Id tidak ditemukan';
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      responseCode = 400;
      responseBody.status = error.status;
      responseBody.message = error.message;
    } else {
      responseCode = 500;
      responseBody.status = 'error';
      responseBody.message = 'Buku gagal diperbarui';
    }

    return h.response(responseBody).code(responseCode);
  }

  return h.response(responseBody).code(responseCode);
};

BookHandler.deleteBookByIdHandler = (request, h) => {
  let responseCode = 200; // Default response code
  const responseBody = {};
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    responseBody.status = 'success';
    responseBody.message = 'Buku berhasil dihapus';
  } else {
    responseCode = 404;
    responseBody.status = 'fail';
    responseBody.message = 'Buku gagal dihapus. Id tidak ditemukan';
  }

  return h.response(responseBody).code(responseCode);
};

module.exports = {
  BookHandler,
};
