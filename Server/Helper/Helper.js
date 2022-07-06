/** @format */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Helper {
  constructor() {
    console.log("Helper function running!!");
  }

  // Generate hash password
  async generate_hash_password(password) {
    if (!password.trim()) {
      return false;
    } else {
      var hash = await bcrypt.hash(password, 10);
      try {
        return hash;
      } catch (error) {
        return false;
      }
    }
  }

  // Compare Password
  async compare_password(user, password) {
    var result = await bcrypt.compare(password, user.password);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  // Generate jwt token
  async generate_token(user) {
    var token = await jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1d" }
    );
    return token;
  }
}

module.exports = new Helper();
