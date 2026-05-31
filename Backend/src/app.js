const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user.routes.js");
const healthCheckRouter = require("./routes/healthCheck.routes.js");

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routes

const logs = () => {
  console.log("app called");
};

app.use("/api/user", userRouter);
app.use("/api/server", healthCheckRouter);

module.exports = app;
