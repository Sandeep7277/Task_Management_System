const mongoose = require("mongoose");

// Creating task schema
const taskSchema = new mongoose.Schema({
  //  title, description, assigned user, due date, and completion status.
  title: {
    type: String,
    required: [true, "Title is required field!"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required field!"],
    trim: true,
  },
  assignedUser: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  completionStatus: {
    type: String,
    default: undefined,
  },
});

module.exports = mongoose.model("Task", taskSchema);
