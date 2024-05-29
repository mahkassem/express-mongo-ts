// exception middleware
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export function exceptionHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
  // log the error
  logger.error(error);

  // return a response
  res.status(500).json({
    message: error instanceof Error ? error.message : 'Internal Server Error',
  });
}