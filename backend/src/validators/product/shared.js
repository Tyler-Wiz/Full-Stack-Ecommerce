const { body } = require("express-validator");

const categoryRules = () => {
  return [
    body("name").notEmpty().withMessage("product name must be specified"),
    body("description").notEmpty().withMessage("description must be specified"),
  ];
};

const brandRules = () => {
  return [
    body("name").notEmpty().withMessage("product name must be specified"),
  ];
};

// allowedFields
const categoryFields = ["name", "description"];
const brandFields = ["name"];

// Export
module.exports = { categoryRules, brandRules, brandFields, categoryFields };
