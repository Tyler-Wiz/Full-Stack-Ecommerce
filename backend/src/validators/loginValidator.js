const { body, validationResult } = require("express-validator");

const loginResetRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username cannot be empty")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 8 })
      .withMessage("Your password must be at least 8 characters"),
  ];
};
module.exports = {
  loginResetRules,
};
