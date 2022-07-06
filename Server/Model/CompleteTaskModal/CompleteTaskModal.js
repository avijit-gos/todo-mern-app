/** @format */

const mongoose = require("mongoose");

const CompleteTaskModal = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      trim: true,
      maxlength: [10, "You can provide maximum 10 characters"],
      require: [true, "You have to provide your task's title"],
    },
    body: {
      type: String,
      trim: true,
      require: [true, "You have to provide your task's details"],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    originalId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Completed_Task", CompleteTaskModal);
