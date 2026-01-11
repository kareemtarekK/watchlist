import "dotenv/config";

// send error in development
const sendDevError = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// send token expired error
const sendTokenExpiredError = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: "Your token has expired, please login again",
  });
};

// send jwt error
const sendJwtError = (res, err) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: "Invalied token, please login again",
  });
};

// send production error
const sendProdError = (res, err) => {
  // check if error is opeartional
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  // send token expired error
  if (err.name === "TokenExpiredError") sendTokenExpiredError(res, err);
  // send jwt error
  if (err.name === "JsonWebTokenError") sendJwtError(res, err);
};

const globalErrorHandling = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // send error in development
  if (process.env.NODE_ENV === "development") sendDevError(res, err);
  // send production error
  if (process.env.NODE_ENV === "production") sendProdError(res, err);
};

export default globalErrorHandling;
