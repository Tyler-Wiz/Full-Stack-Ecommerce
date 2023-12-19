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

const discountRules = () => {
  return [
    body("name").notEmpty().withMessage("product name must be specified"),
    body("description").notEmpty().withMessage("description must be specified"),
    body("discount_percent")
      .notEmpty()
      .isInt({ min: 0, max: 100 })
      .withMessage("Discount Percentage must be specified"),
    body("active")
      .notEmpty()
      .isInt({ min: 0, max: 1 })
      .withMessage("Must be value between 0 and 1"),
  ];
};

const updateDiscountRules = () => {
  return [
    body("discount_percent")
      .notEmpty()
      .isInt({ min: 0, max: 100 })
      .withMessage("Discount Percentage must be specified"),
    body("active")
      .notEmpty()
      .isInt({ min: 0, max: 1 })
      .withMessage("Must be value between 0 and 1"),
  ];
};

// allowedFields
const categoryFields = ["name", "description"];
const brandFields = ["name"];
const discountFields = ["name", "description", "discount_percent", "active"];
const updateDiscountFields = ["discount_percent", "active"];

// Export
module.exports = {
  categoryRules,
  brandRules,
  brandFields,
  categoryFields,
  discountFields,
  discountRules,
  updateDiscountRules,
  updateDiscountFields,
};
