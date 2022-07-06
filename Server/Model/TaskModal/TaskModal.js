/** @format */

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
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
    imp: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    complete: { type: Boolean, default: false },
    pendding: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
