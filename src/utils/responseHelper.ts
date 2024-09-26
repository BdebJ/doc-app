import { Response } from 'express';
import { SuccessResponse } from '../types/common';

export const sendSuccessResponse = <T>(res: Response, statusCode: number, message: string, data: T): Response<SuccessResponse<T>> => {
  const response: SuccessResponse<T> = {
    message,
    data
  };
  return res.status(statusCode).json(response);
};