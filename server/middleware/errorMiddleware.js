export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || error.status || 500;
  let message = error.message || "Something went wrong.";

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier.";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(" ");
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "A record with that value already exists.";
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({ message });
}
