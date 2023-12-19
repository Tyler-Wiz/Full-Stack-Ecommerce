const { body } = require("express-validator");

const userRegisterRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username cannot be empty")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters")
      .trim(),
    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Input must be a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 8 })
      .withMessage("Your password must be at least 8 characters"),
    body("is_admin")
      .optional({ checkFalsy: false, nullable: true })
      .isLength({ min: 10 })
      .withMessage("Please enter minimum 10 characters")
      .withMessage("isAdmin must to be a number between 0 and 1"),
  ];
};

module.exports = {
  userRegisterRules,
};
