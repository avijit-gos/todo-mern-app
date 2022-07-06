/** @format */

const mongoose = require("mongoose");
const Task = require("../../Model/TaskModal/TaskModal");
const User = require("../../Model/UserModel/UserModel");
const Completed_Task = require("../../Model/CompleteTaskModal/CompleteTaskModal");
const Pending_Task = require("../../Model/PendingTask/PendingTaskSchema");
const util = require("util");

class TaskController {
  constructor() {
    console.log("TaskController running!!");
  }

  // 1. Create Task
  async createTask(req, res) {
    const { title, body } = req.body;
    if (!title.trim() || !body.trim()) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      const newTask = Task({
        _id: new mongoose.Types.ObjectId(),
        title,
        body,
        createdBy: req.user._id,
      });
      newTask
        .save()
        .then(async (taskData) => {
          var user = await User.findByIdAndUpdate(
            req.user._id,
            {
              $addToSet: { tasks: taskData._id },
            },
            { new: true }
          );
          return res
            .status(201)
            .json({ msg: "Task has been created successfully", taskData });
        })
        .catch((err) => {
          return res.status(501).json({ msg: err.message });
        });
    }
  }

  // 2. Fetch all user related task
  async getTasks(req, res) {
    var tasks = await Task.find({ createdBy: req.user._id })
      .populate("createdBy", "-password")
      .sort({ createdAt: -1 });
    try {
      return res.status(200).json({ tasks, userId: req.user._id });
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  }

  // 3. Pinned Task
  async pinnedTask(req, res) {
    // 62b73d980a23a2c9107d7b1f
    if (!req.params.id) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var task = await Task.updateMany(
        {},
        { $set: { imp: false } },
        { multi: true }
      );
      task = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: { imp: true } },
        { new: true }
      );

      try {
        return res.status(200).json({ msg: "Task set as an importent task" });
      } catch (error) {
        return res.status(501).json({ msg: error.message });
      }
    }
  }

  // 4. Unpinned task
  async removePinnedTask(req, res) {
    // 62b73d980a23a2c9107d7b1f
    if (!req.params.id) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var task = await Task.updateMany(
        { _id: req.params.id },
        { imp: false },
        { multi: true }
      );

      try {
        return res
          .status(200)
          .json({ msg: "Task remove from importent task list" });
      } catch (error) {
        return res.status(501).json({ msg: error.message });
      }
    }
  }

  // 62bfbf98aaa185ca8292fa7d
  // 62bfbf93aaa185ca8292fa77

  // 5. Delete Task
  async deleteTask(req, res) {
    if (!req.params.id) {
      return res.status(501).json({ msg: "Invalid request" });
    } else {
      var task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(501).json({ msg: "Invalid task" });
      } else {
        if (task.imp) {
          return res
            .status(501)
            .json({ msg: "This task set as importent task" });
        } else {
          var user = await User.findByIdAndUpdate(
            req.user._id,
            {
              $pull: { tasks: req.params.id },
            },
            { new: true }
          );
          if (task.complete) {
            var complteTask = await Completed_Task.findOneAndDelete(
              { originalId: req.params.id },
              { new: true }
            );
            user = await User.findByIdAndUpdate(
              req.user._id,
              {
                $pull: { completed: complteTask._id },
              },
              { new: true }
            );
          }
          if (task.pendding) {
            var penndingTask = await Pending_Task.findOneAndDelete(
              { originalId: req.params.id },
              { new: true }
            );
            user = await User.findByIdAndUpdate(
              req.user._id,
              {
                $pull: { pendding: penndingTask._id },
              },
              { new: true }
            );
          }
          task = await Task.findByIdAndDelete(req.params.id);
          try {
            return res.status(200).json({ msg: "Task has been deleted" });
          } catch (error) {
            return res.status(401).json({ msg: error.message });
          }
        }
      }
    }
  }

  // 6. Edit Task
  async editTask(req, res) {
    if (!req.params.id) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(401).json({ msg: "Task does not exists" });
      } else {
        if (!req.body.title.trim() || !req.body.body.trim()) {
          return res.status(401).json({ msg: "Empty input" });
        } else {
          task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { title: req.body.title, body: req.body.body } },
            { new: true }
          );
          try {
            return res.status(200).json({ msg: "Task has been updated", task });
          } catch (error) {
            return res.status(401).json({ msg: error.message });
          }
        }
      }
    }
  }

  // 7. Complete task
  async completeTask(req, res) {
    if (!req.params.id) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(401).json({ msg: "Invalid task" });
      } else {
        const newCompletedTask = Completed_Task({
          _id: new mongoose.Types.ObjectId(),
          title: task.title,
          body: task.body,
          createdBy: task.createdBy,
          originalId: req.params.id,
          complete: true,
        });

        newCompletedTask
          .save()
          .then(async (data) => {
            var user = await User.findByIdAndUpdate(
              req.user._id,
              { $addToSet: { completed: data._id } },
              { new: true }
            );
            var task = await Task.findByIdAndUpdate(
              req.params.id,
              {
                $set: { complete: true },
              },
              { new: true }
            );
            return res
              .status(200)
              .json({ msg: "Task has been selected as completed task" });
          })
          .catch((error) => {
            return res.status(501).json({ msg: error.message });
          });
      }
    }
  }

  // 8. Pending task
  async pendingTask(req, res) {
    if (!req.params.id) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(401).json({ msg: "Invalid task" });
      } else {
        const NewPendingTask = Pending_Task({
          _id: new mongoose.Types.ObjectId(),
          title: task.title,
          body: task.body,
          createdBy: task.createdBy,
          originalId: req.params.id,
        });

        NewPendingTask.save()
          .then(async (data) => {
            var user = await User.findByIdAndUpdate(
              req.user._id,
              { $addToSet: { pendding: data._id } },
              { new: true }
            );
            var task = await Task.findByIdAndUpdate(
              req.params.id,
              {
                $set: { pendding: true, pId: data._id },
              },

              { new: true }
            );
            return res
              .status(200)
              .json({ msg: "Task has been selected as Pending task" });
          })
          .catch((error) => {
            return res.status(501).json({ msg: error.message });
          });
      }
    }
  }

  // 9. Resolve pending task
  async resolveTask(req, res) {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var task = await Task.findById(taskId);
      if (!taskId) {
        return res.status(401).json({ msg: "Invalid task" });
      } else {
        var pendingTask = await Pending_Task.findOne({ originalId: taskId });
        console.log(pendingTask._id);
        var task = await Task.findByIdAndUpdate(
          taskId,
          { $set: { pendding: false } },
          { new: true }
        );
        var user = await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { pendding: pendingTask._id },
          },
          { new: true }
        );
        // console.log(user);
        var pendingTask = await Pending_Task.findByIdAndDelete(task.pId);
        try {
          return res.status(200).json({ msg: "Task has been resolve", task });
        } catch (error) {
          return res.status(401).json({ msg: error.message });
        }
      }
    }
  }

  // 10. Fetch all completed task
  async getCompletedTasks(req, res) {
    var completedTasks = await Completed_Task.find({
      createdBy: req.user._id,
    })
      .populate("createdBy", "-password")
      .sort({ createdAt: -1 });

    try {
      return res.status(200).json(completedTasks);
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  }

  async getPendingTasks(req, res) {
    var pendingTasks = await Pending_Task.find({
      createdBy: req.user._id,
    })
      .populate("createdBy", "-password")
      .sort({ createdAt: -1 });

    try {
      return res.status(200).json(pendingTasks);
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  }
}

module.exports = new TaskController();
