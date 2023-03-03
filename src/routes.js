const {tambahBukuHandler,
  tampilBukuById,
  tampilBukuHandler,
  editBukuByIdHandler,
  hapusBukuByIdHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: tambahBukuHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: tampilBukuHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: tampilBukuById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBukuByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: hapusBukuByIdHandler,
  },
];


module.exports = routes;
