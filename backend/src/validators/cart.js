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
    body("selected_color")
      .optional({ checkFalsy: true, nullable: true })
      .isString(),
    body("selected_size")
      .optional({ checkFalsy: true, nullable: true })
      .isString(),
  ];
};

// allowedFields
const cartFields = ["user_id", "product_id", "selected_size", "selected_color"];

module.exports = { cartFields, cartRules };
