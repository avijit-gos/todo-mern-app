/** @format */

const redis = require("redis");
const client = redis.createClient();

client
  .connect()
  .then(() => {
    console.log("Redis is connected");
  })
  .catch((err) => {
    console.log("Redis is not connected " + err);
  });

module.exports = client;
