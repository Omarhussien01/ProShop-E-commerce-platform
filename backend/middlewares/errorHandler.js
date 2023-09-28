const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized
        errorMessage = 'Unauthorized Access';
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403; // Forbidden
        errorMessage = 'Forbidden Access';
    } else if (err.message === 'Not Found') {
        statusCode = 404; // Not Found
        errorMessage = 'Resource Not Found';
    }

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
};
  
  export { notFound, errorHandler };