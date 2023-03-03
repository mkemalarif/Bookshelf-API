const {nanoid} = require('nanoid');
const books = require('./books');

const tambahBukuHandler = (request, h)=>{
  const {name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;

  const id = nanoid(16);
  let finished;
  if (readPage == pageCount) {
    finished = true;
  } else {
    finished = false;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. '+
       'readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const bukuBaru = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(bukuBaru);

  const isSuccess = books.filter((buku)=> buku.id === id).length>0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  response.code(500);
  return response;
};

const tampilBukuHandler = (request, h)=>{
  const {name, reading, finished} = request.query;
  let ambilBuku = books;
  const buku = (book)=> ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  });
  // books.forEach((book) => console.log(typeof book.name));

  if (name !== undefined) {
    ambilBuku = books.filter(
        (book)=> book.name.toLowerCase().includes(name.toLowerCase()));
  };

  if (reading !== undefined) {
    ambilBuku = books.filter((book) => book.reading === false);
  };

  if (finished !== undefined) {
    if (finished == '1') {
      ambilBuku = books.filter((book)=> book.finished == true);
    } else if (finished == '0') {
      ambilBuku = books.filter((book)=> book.finished == false);
    };
  };


  const response = h.response({
    status: 'success',
    data: {
      books: ambilBuku.map(buku),
    },
  });
  response.code(200);
  return response;
};

const tampilBukuById = (request, h) => {
  const {id} = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBukuByIdHandler = (request, h) =>{
  const {id} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  if (name === undefined || name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. '+
      'readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  };


  const index = books.findIndex((book)=> book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const hapusBukuByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {tambahBukuHandler, tampilBukuHandler, tampilBukuById,
  editBukuByIdHandler, hapusBukuByIdHandler};
