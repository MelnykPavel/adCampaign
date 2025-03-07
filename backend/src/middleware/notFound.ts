import { ERROR_MESSAGES } from '../constants';
import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(ERROR_MESSAGES.NOT_FOUND_ERROR.code);
  res.status(404);
  next(error);
};

export default notFound;
