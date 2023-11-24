//Import Packages
const express = require("express");
const morgan = require("morgan");
const taskRouter = require("./routes/taskRouters");

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

module.exports = app;
