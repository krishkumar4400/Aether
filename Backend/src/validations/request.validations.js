const { body } = require("express-validator");

const registerRequestValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be atleast 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 5 })
    .withMessage("Invalid Email Id"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];

const loginRequestValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 5 })
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];

module.exports = {
    registerRequestValidator,
    loginRequestValidator
}