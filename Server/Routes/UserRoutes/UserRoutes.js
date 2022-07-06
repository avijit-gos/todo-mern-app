/** @format */

const router = require("express").Router();
const {
  register,
  login,
  fetchUser,
  changePassword,
  uploadImage,
  updateProfile,
} = require("../../Controller/UserController/UserController");
const Auth = require("../../Middleware/Auth");

// 1. Register new user
router.post("/register", register);
// 2. Login user
router.post("/login", login);
// 3. Update profile image
router.post("/upload/profile-image", Auth, uploadImage);
// 4. Update profile
router.put("/update/profile", Auth, updateProfile);
// 5. Fetch user profile details
// 6. Update profile password
router.post("/change-password", Auth, changePassword);
// 7. Fetch user details
router.get("/", Auth, fetchUser);
module.exports = router;
