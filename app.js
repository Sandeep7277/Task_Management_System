//Import Packages
const express = require("express");
const morgan = require("morgan");
const taskRouter = require("./routes/taskRouters");
const CustomError = require("./utils/CustomError");
const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRouter");

//Call Express() method
let app = express();

//use middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

//Using Routes Endpoint
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", authRouter);

//Defaults Route
app.all("*", (req, res, next) => {
  //Initiate Custom error handler middleware object
  const err = new CustomError(
    `'Can't find ${req.originalUrl} on the server!`,
    404
  );

  next(err); //call global error handler middleware
});

//Use globalErrorHandler middleware of errorContrller file
app.use(globalErrorHandler);

module.exports = app;
