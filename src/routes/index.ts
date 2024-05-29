import { Request, Response, Router } from 'express';
import bookRouter from './books.routes';

const router = Router();

// Health check route
router.use('/health', (req: Request, res: Response) => res.sendStatus(200));

// Book routes
router.use('/books', bookRouter);

export default router;
