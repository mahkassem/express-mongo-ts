import BookModel from '../models/books.models';
import app from '../app';
import request from 'supertest';

// test app suite
describe('App', () => {

  // health check
  it('should return a 200 status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
  });
});

describe('Books Model', () => {
  // Store the _id of the book created in the test
  let _id: string | undefined;

  it('should create a new book', async () => {
    const book = {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publication_date: '1937-09-21',
    };
    const newBook = await BookModel.createBook(book);
    _id = newBook._id;

    expect(newBook).toHaveProperty('_id');
    expect(newBook.title).toBe(book.title);
    expect(newBook.author).toBe(book.author);
    expect(newBook.publication_date).toEqual(book.publication_date);
  });

  it('should return a list of books', async () => {
    const books = await BookModel.searchBookByTitle('The');
    expect(books.length).toBeGreaterThan(0);
  });

  it('should get a book by title', async () => {
    const book = await BookModel.getBookByTitle('The Hobbit');

    expect(book).toBeTruthy();
    expect(book).toHaveProperty('_id');
    expect(book?.title).toBe('The Hobbit');
    expect(book?.author).toBe('J.R.R. Tolkien');
    expect(book?.publication_date).toEqual('1937-09-21');
  });

  it('should delete a book', async () => {
    const deletedBook = await BookModel.deleteBook(_id ?? '');
    expect(deletedBook).toBeTruthy();
  });
});

// Books Controller
describe('Books Controller', () => {
  // Store the _id of the book created in the test
  let _id: string | undefined;

  // Clean up after all tests
  afterAll(async () => {
    if (_id) {
      await BookModel.deleteBook(_id);
    }
  });

  it('should create a new book', async () => {
    const book = {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publication_date: '1937-09-21',
    };
    const response = await request(app).post('/books').send(book);

    // Store the _id of the book created in the test
    // to clean up after all tests
    _id = response.body._id;

    expect(response.status).toBe(201);

    const newBook = response.body;
    expect(newBook).toHaveProperty('_id');
    expect(newBook.title).toBe(book.title);
    expect(newBook.author).toBe(book.author);
    expect(newBook.publication_date).toEqual(book.publication_date);
  });

  it('should return a list of books', async () => {
    const response = await request(app).get('/books/search?term=The');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

});
