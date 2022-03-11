const {BookHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: BookHandler.addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: BookHandler.getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: BookHandler.getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: BookHandler.editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: BookHandler.deleteBookByIdHandler,
  },
];

module.exports = routes;
