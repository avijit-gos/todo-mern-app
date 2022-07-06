/** @format */

require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const db = require("./database");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use("/api/user", require("./Server/Routes/UserRoutes/UserRoutes"));
app.use("/api/task", require("./Server/Routes/TaskRoutes/TaskRoutes"));

// ------------ DEPLOYMENT ------------ //
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const port = process.env.PORT || 5010;
app.listen(port, () => console.log(`App listening at port:${port}!!`));
