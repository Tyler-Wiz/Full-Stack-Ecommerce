const { body } = require("express-validator");

const productRules = () => {
  return [
    body("name").notEmpty().withMessage("product name must be specified"),
    body("description").notEmpty().withMessage("description must be specified"),
    body("price")
      .notEmpty()
      .isFloat("5.99", { min: 3 })
      .withMessage("price must be a number"),
    body("category_id")
      .optional({ checkFalsy: true, nullable: true })
      .isInt({ min: 1, max: 6 })
      .withMessage("price must be a number"),
    body("discount_id")
      .optional({ checkFalsy: true, nullable: true })
      .isInt({ min: 1, max: 6 })
      .withMessage("price must be a number"),
    body("brand_id")
      .optional({ checkFalsy: true, nullable: true })
      .isInt({ min: 1, max: 6 })
      .withMessage("price must be a number"),
  ];
};

const productAttrRules = () => {
  return [
    body("product_id")
      .notEmpty()
      .isInt({ min: 1, max: 6 })
      .withMessage("Product must be a Add"),
    body("att_options_id")
      .notEmpty()
      .isInt({ min: 1, max: 6 })
      .withMessage("Attribute Option must be a number"),
  ];
};

// allowedFields
const productFields = [
  "name",
  "description",
  "price",
  "category_id",
  "discount_id",
  "brand_id",
  "product_id",
  "att_options_id",
];

module.exports = { productFields, productRules, productAttrRules };
