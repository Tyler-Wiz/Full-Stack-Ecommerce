const { body } = require("express-validator");

const userRules = () => {
  return [
    body("first_name").notEmpty().withMessage("First Name must be specified"),
    body("last_name").notEmpty().withMessage("Last Name must be specified"),
  ];
};

// allowedFields
const userFields = ["id", "first_name", "last_name"];

module.exports = { userFields, userRules };
