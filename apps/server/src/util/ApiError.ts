class ApiError extends Error {
  constructor(
    private statusCode,
    message,
    name = '',
    private isOperational = true,
    stack = ''
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
