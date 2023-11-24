const CustomError = require("./../utils/CustomError");

//Createing global error handling middleware with categorised with development and production env.
//Development error function
const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    Message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

//Production error function
const prodErrors = (res, error) => {
  //for Operational error
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      Message: error.message,
    });
  } else {
    //For Mongoose error
    res.status(500).json({
      status: "error",
      Message: "Something went wrong! Please try again.",
    });
  }
};

//Cast Error Handler Function
const castErrorHandler = (err) => {
  const msg = `Invalid Value ${err.value} for field ${err.path}!`;
  return new CustomError(msg, 400);
};

const duplicateErrorHandler = (err) => {
  // const name = err.keyValue.name || err.keyValue.email;
  const name = JSON.stringify(err.keyValue);
  const msg = `${name} is already exist. Please use another!`;
  return new CustomError(msg, 400);
};

const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessage = errors.join("._");
  const msg = `Invalid input data : ${errorMessage}`;
  return new CustomError(msg, 400);
};

// Global error handling middleware
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }
    if (error.code === 11000) {
      error = duplicateErrorHandler(error);
    }
    if (error.name === "ValidationError") {
      error = validationErrorHandler(error);
    }
    prodErrors(res, error);
  }
};
