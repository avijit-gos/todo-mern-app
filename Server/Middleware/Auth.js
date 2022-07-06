/** @format */

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ msg: "Unauthenticated user" });
  } else {
    var verify = await jwt.verify(token, process.env.TOKEN_KEY);
    try {
      req.user = verify;
      next();
    } catch (error) {
      next();
      return res.status(401).json({ msg: "Unauthenticated user" });
    }
  }
};
