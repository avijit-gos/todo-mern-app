/** @format */

const Auth = require("../../Middleware/Auth");

const router = require("express").Router();
const {
  createTask,
  getTasks,
  pinnedTask,
  removePinnedTask,
  deleteTask,
  editTask,
  completeTask,
  pendingTask,
  resolveTask,
  getCompletedTasks,
  getPendingTasks,
} = require("../../Controller/TaskController/TaskController");

// 1. Create Task
router.post("/", Auth, createTask);
// 2. Fetch all user related task
router.get("/", Auth, getTasks);
// 3. Pinned Task
router.patch("/pinned/:id", Auth, pinnedTask);
// 4. Unpinned task
router.patch("/unpinned/:id", Auth, removePinnedTask);
// 5. Delete Task
router.delete("/delete/:id", Auth, deleteTask);
// 6. Edit Task
router.put("/edit/:id", Auth, editTask);
// 7. Complete task
router.put("/complete/:id", Auth, completeTask);
// 8. Pending task
router.put("/pendding/:id", Auth, pendingTask);
// 9. Resolve pending task
router.put("/resolve/:id", Auth, resolveTask);
// 10. Fetch all completed task
router.get("/complete", Auth, getCompletedTasks);
// 11. Fetch all pending task
router.get("/pending", Auth, getPendingTasks);
module.exports = router;
