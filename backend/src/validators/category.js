const { body } = require("express-validator");

const categoryRules = () => {
  return [
    body("name").notEmpty().withMessage("product name must be specified"),
    body("description").notEmpty().withMessage("description must be specified"),
  ];
};

module.exports = { categoryRules };
