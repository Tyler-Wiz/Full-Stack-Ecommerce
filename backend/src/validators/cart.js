const { body } = require("express-validator");

const cartRules = () => {
  return [
    body("user_id")
      .notEmpty()
      .isInt({ max: 100 })
      .withMessage("attribute id must be specified"),
    body("product_id")
      .notEmpty()
      .isInt({ max: 100 })
      .withMessage("attribute id must be specified"),
  ];
};

// allowedFields
const cartFields = ["user_id", "product_id"];

module.exports = { cartFields, cartRules };
