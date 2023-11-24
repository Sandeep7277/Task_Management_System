const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const Task = require("./../models/taskModel");
const ApiFeatures = require("./../utils/apiFeatures");
const CustomError = require("./../utils/CustomError");

//GET All TASKS
exports.getAllTasks = asyncErrorHandler(async (req, res, next) => {
  console.log(req.query);
  const features = new ApiFeatures(Task.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tasks = await features.query;

  res.status(200).json({
    Status: "Success",
    Length: tasks.length,
    Data: {
      tasks,
    },
  });
});

//POST A TASK
exports.createTask = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    Status: "Success",
    Data: {
      task,
    },
  });
});

//GET SINGLE TASK
exports.getTask = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new CustomError("Task with that ID is not found!", 404);
    return next(error);
  }
  res.status(200).json({
    Status: "Success",
    Data: {
      task,
    },
  });
});

//PATCH TASK
exports.updateTask = asyncErrorHandler(async (req, res, next) => {
  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateTask) {
    const error = new CustomError("Task with that ID is not found!", 404);
    return next(error);
  }
  res.status(200).json({
    Status: "Success",
    Data: {
      task: updateTask,
    },
  });
});

//DELETE TASK
exports.deleteTask = asyncErrorHandler(async (req, res, next) => {
  const deleteTask = await Task.findByIdAndDelete(req.params.id);

  if (!deleteTask) {
    const error = new CustomError("Task with that ID is not found!", 404);
    return next(error);
  }

  res.status(204).json({
    Status: "Success",
    Data: null,
  });
});
