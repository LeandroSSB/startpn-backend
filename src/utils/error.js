export class ErrorHandler extends Error {
  constructor({ statusCode, message }) {
    super();
    this.message = message;
    this.statusCode = statusCode || 500;
  }
}

export const handleError = (err, res ) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    status: "error",
    statusCode: statusCode || 500,
    message,
  });
};