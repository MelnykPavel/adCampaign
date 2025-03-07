import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { VALIDATION_ERROR_MESSAGES } from '../constants';

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => {
      const errorMessage = VALIDATION_ERROR_MESSAGES[error.msg] || {
        message: 'Validation error',
        statusCode: 400,
        code: 'VALIDATION_ERROR',
      };
      return {
        message: errorMessage.message,
        code: errorMessage.code,
      };
    });

    res.status(400).json({ errors: formattedErrors });
    return;
  }

  next();
};

export default validate;
