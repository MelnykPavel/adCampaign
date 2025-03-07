import { ERROR_MESSAGES } from '../constants';
import { Request, Response, NextFunction } from 'express';

type ErrorMessageKeys = keyof typeof ERROR_MESSAGES;

interface ErrorHandler extends Error {
  code?: ErrorMessageKeys;
  additionalCode?: ErrorMessageKeys;
}

const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error caught:', {
    message: err?.message,
    stack: err?.stack,
    additionalCode: err?.additionalCode,
    code: err?.code,
    path: req?.originalUrl,
  });

  const errorCode = err.additionalCode || err.code;
  const objError = errorCode ? ERROR_MESSAGES[errorCode] : undefined;

  if (objError) {
    res.status(objError.statusCode).json({ error: objError.message });
    return;
  }

  res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.statusCode).json({
    error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
  });
};

export default errorHandler;
