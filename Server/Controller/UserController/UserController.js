/** @format */

const mongoose = require("mongoose");
const User = require("../../Model/UserModel/UserModel");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const {
  generate_hash_password,
  compare_password,
  generate_token,
} = require("../../Helper/Helper");

class UserController {
  constructor() {
    console.log("UserController running!!");
  }

  // 1. Register new user
  async register(req, res) {
    const { name, username, email, password } = req.body;
    // if any of the input field is empty then return Error
    if (!name.trim() || !username.trim() || !password.trim() || !email.trim()) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      // Check if username or email has already been taken or not..
      var user = await User.find({
        $or: [{ email: email }, { username: username }],
      });
      // if user array length is greater than 0 then we can say user already exists
      if (user.length > 0) {
        return res
          .status(401)
          .json({ msg: "Username or Email has been taken" });
      }
      // Hash user password
      else {
        var hash = await generate_hash_password(password);
        if (!hash) {
          return res.status(401).json({ msg: "Something went wrong" });
        } else {
          // if helper function return hash password then create new instance of user and saved into the database
          const newUser = User({
            _id: new mongoose.Types.ObjectId(),
            name,
            username,
            email,
            password: hash,
          });
          var user = await newUser.save();
          try {
            return res.status(201).json({ msg: "Registration successfull" });
          } catch (error) {
            return res.status(501).json({ msg: error.message });
          }
        }
      }
    }
  }

  // 2. Login user
  async login(req, res) {
    const { logUser, password } = req.body;
    if (!logUser.trim() || !password.trim()) {
      return res.status(401).json({ msg: "Invalid input" });
    } else {
      var user = await User.findOne({
        $or: [{ email: logUser }, { username: logUser }],
      });
      if (!user) {
        return res.status(401).json({ msg: "User not registered" });
      } else {
        // Compare user password
        var result = await compare_password(user, password);
        if (!result) {
          return res.status(401).json({ msg: "Invalid password" });
        } else {
          // Generate jwt token
          var token = await generate_token(user);
          if (token) {
            return res.status(200).json({ token, userId: user._id, user });
          }
        }
      }
    }
  }

  async fetchUser(req, res) {
    var user = await User.findById(req.user._id);
    if (!user) {
      return res.status("Invalid user or user does not exists");
    } else {
      try {
        return res.status(200).json(user);
      } catch (error) {
        return res.status(501).json({ msg: error.message });
      }
    }
  }

  async changePassword(req, res) {
    const { currentPassowrd, newPassword, userId } = req.body;
    if (!currentPassowrd.trim() || !newPassword.trim() || !userId.trim()) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ msg: "User does not exists" });
      } else {
        var result = await compare_password(user, currentPassowrd);
        if (!result) {
          return res
            .status(401)
            .json({ msg: "Current password is not corrent" });
        } else {
          var hash = await generate_hash_password(newPassword);
          user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { password: hash } },
            { new: true }
          );
          try {
            return res
              .status(200)
              .json({ msg: "Password successfully changed" });
          } catch (err) {
            return res.status(501).json({ msg: err.message });
          }
        }
      }
    }
  }

  async uploadImage(req, res) {
    const file = req.files.profile_img;
    if (!req.files) {
      return res.status(401).json({ msg: "Empty file" });
    } else {
      var user = await User.findById(req.user._id);
      if (!user) {
        return res.status(401).json({ msg: "User does not exists" });
      } else {
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
          if (err) {
            return res.status(501).json({ msg: err.message });
          } else {
            user = await User.findByIdAndUpdate(
              req.user._id,
              { $set: { profile_img: result.url } },
              { new: true }
            );

            try {
              return res
                .status(200)
                .json({ msg: "Profile image uploaded", user });
            } catch (error) {
              return res.status(501).json({ msg: error.message });
            }
          }
        });
      }
    }
  }

  async updateProfile(req, res) {
    const { name, username } = req.body;
    if (!name.trim() || !username.trim()) {
      return res.status(401).json({ msg: "Invalid request" });
    } else {
      var user = await User.findOne({ username: username });
      if (user) {
        return res.status(401).json({ msg: "Username already taken" });
      } else {
        user = await User.findByIdAndUpdate(
          req.user._id,
          { $set: { name: name, username: username } },
          { new: true }
        );

        try {
          return res
            .status(200)
            .json({ msg: "Profile has been updated", user });
        } catch (error) {
          return res.status(501).json({ msg: error.message });
        }
      }
    }
  }
}

module.exports = new UserController();
