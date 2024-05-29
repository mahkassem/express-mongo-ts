import { Request, Response } from 'express';
import BookModel, { Book } from '../models/books.models';
import logger from '../utils/logger';

class BookController {
  /**
 * Create a new book
 * 
 * @param payload Partial<Book>
 * @returns Book
 */
  async create(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const book: Book = req.body;
      const newBook = await BookModel.createBook(book);
      res.status(201).json(newBook);
    } catch (error: unknown) {
      logger.error(error);
      res.status(500).json({ error: "Error creating book" });
    }
  }

  /**
   * Get book by title
   * 
   * @param title string
   * @returns Book | null
   */
  async search(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const term = req.query.term as string;
      const books = await BookModel.searchBookByTitle(term);
      res.status(200).json(books);
    } catch (error: unknown) {
      logger.error(error);
      res.status(500).json({ error: "Error getting book" });
    }
  }
}

export default new BookController();