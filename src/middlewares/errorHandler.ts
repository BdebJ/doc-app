import { ErrorRequestHandler } from 'express';
import { BadRequestError, ConflictError } from '../errors/ErrorTypes';
import { ErrorResponse } from '../types/common';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);

  if (err instanceof BadRequestError) {
    const response: ErrorResponse = {
      message: err.message,
      data: null
    };
    return res.status(err.statusCode).json(response);
  }

  if (err instanceof ConflictError) {
    const response: ErrorResponse = {
      message: err.message,
      data: null
    };
    return res.status(err.statusCode).json(response);
  }


  // Default error fallback
  const response: ErrorResponse = {
    message: 'Something went wrong!',
    data: null
  };
  return res.status(500).json(response);
};
