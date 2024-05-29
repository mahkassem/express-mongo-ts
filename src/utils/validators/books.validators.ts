import {
  Request,
  Response,
  NextFunction
} from 'express';
import { body, validationResult } from 'express-validator';
import BookModel from '../../models/books.models';


export const addBookValidationRules = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await body('title')
    .isString()
    .withMessage('Title must be a string')
    .custom(async (value: string) => {
      const book = await BookModel.getBookByTitle(value);
      if (book) {
        return Promise.reject('Title already exists');
      }
    })
    .run(req);

  await body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isString()
    .withMessage('Author must be a string')
    .run(req);

  await body('publication_date')
    .isDate()
    .withMessage('Publication date must be a date')
    .run(req);

  // Check for validation errors
  const errors = validationResult(req);

  // If there are errors, return a 422 response
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // If there are no errors, continue
  next();
}
