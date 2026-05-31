const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models.js");
const blackListedTokenModel = require("../models/blackListedToken.models.js");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    let user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(409).json({
        message: "User with this username or email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "You are logged in",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

async function logoutUser(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }
    const { token } = req.cookies;
    await blackListedTokenModel.create({
      token,
    });

    res.clearCookie("token");
    return res.status(200).json({
      message: "You are logged out",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
}

async function getUserData(req, res) {
  try {
    return res.status(200).json({
      user: req.user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
}

module.exports = { registerUser, loginUser, logoutUser, getUserData };
