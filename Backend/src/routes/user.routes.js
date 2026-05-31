const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
} = require("../controllers/user.controller.js");
const { authMiddleware } = require("../middlewares/auth.middlewares.js");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.get("/profile", authMiddleware, getUserData);

module.exports = userRouter;
