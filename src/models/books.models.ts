import { ObjectId } from 'mongodb';
import db from '../utils/database/mongo.conn';
import logger from '../utils/logger';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  publication_date: string;
}

// refactor to class
class BookModel {
  collection = 'books';

  // Search for books by title
  async searchBookByTitle(term: string): Promise<Book[]> {
    try {
      const book = await db
        .collection<Book>(this.collection)
        .find({ title: { $regex: term, $options: 'i' } })
        .limit(2);
      return book.toArray();
    } catch (error: unknown) {
      logger.error(error);
      throw new Error('Error searching books');
    }
  }

  // Create a new book
  async createBook(book: Book): Promise<Book> {
    try {
      const result = await db.collection<Book>('books').insertOne(book);
      return { _id: result.insertedId, ...book };
    } catch (error: unknown) {
      logger.error(error);
      throw new Error('Error creating book');
    }
  }

  // Get book by title
  async getBookByTitle(title: string): Promise<Book | null> {
    try {
      const book = await db.collection<Book>(this.collection).findOne({ title });
      return book;
    } catch (error: unknown) {
      logger.error(error);
      throw new Error('Error getting book by title');
    }
  }

  // Delete book by id
  async deleteBook(_id: string): Promise<string | null> {
    try {
      const result = await db.collection(this.collection).deleteOne({ _id: new ObjectId(_id) });
      if (result.deletedCount === 1) {
        return _id;
      }
      return null;
    } catch (error: unknown) {
      logger.error(error);
      throw new Error('Error deleting book');
    }
  }
}

export default new BookModel();