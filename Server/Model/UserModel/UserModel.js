/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    // Name
    name: { type: String, trim: true, require: [true, "Name is required"] },
    // username
    username: {
      type: String,
      trim: true,
      require: [true, "Username is required"],
      unique: [true, "Username has already been taken"],
    },
    // email
    email: {
      type: String,
      trim: true,
      require: [true, "Email is required"],
      unique: [true, "Email has already been taken"],
    },
    // password
    password: { type: String, trim: true, require: [true, "Name is required"] },
    // profile image
    profile_img: { type: String, default: "" },
    // All tasks
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    // Pending tasks
    pendding: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pending_Task" }],
    // Completed task
    completed: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Completed_Task" },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
