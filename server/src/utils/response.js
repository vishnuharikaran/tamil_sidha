const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

const sendError = (res, error = 'An error occurred', statusCode = 400, message = null) => {
  return res.status(statusCode).json({
    success: false,
    error: typeof error === 'string' ? error : error.message || 'Validation or Server Error',
    message: message || (typeof error === 'string' ? error : error.message || 'Request failed'),
  });
};

module.exports = { sendSuccess, sendError };
