/** @format */

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("error", () => console.log(`MogngoDB is not connected`));
mongoose.connection.on("connected", () => console.log(`MongoDB is connected`));
