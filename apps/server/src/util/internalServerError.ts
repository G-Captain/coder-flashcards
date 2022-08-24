import * as httpStatus from 'http-status';
import ApiError from './ApiError';

export const internalServerError = new ApiError(
  httpStatus.INTERNAL_SERVER_ERROR,
  'Internal server error',
  'INTERNAL_SERVER_ERROR'
);
