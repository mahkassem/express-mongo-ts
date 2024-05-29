import { Router } from 'express';
import BookController from '../controllers/books.controllers';
import { addBookValidationRules } from '../utils/validators/books.validators';

// New Router instance
const router = Router();

// Book routes
router.post('/', addBookValidationRules, BookController.create);
router.get('/search', BookController.search);

export default router;