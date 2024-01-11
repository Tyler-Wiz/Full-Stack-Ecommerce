const { body } = require("express-validator");

const productRules = () => {
  return [
    body("name").notEmpty().withMessage("product name must be specified"),
    body("description").notEmpty().withMessage("description must be specified"),
    body("price")
      .notEmpty()
      .isFloat("5.990", { min: 3 })
      .withMessage("price must be a number"),
    body("stock")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("stock count must be a number"),
    body("discount")
      .optional({ checkFalsy: true, nullable: true })
      .isInt({ min: 1 }),
    body("discount_name")
      .optional({ checkFalsy: true, nullable: true })
      .isString(),
    body("colors").optional({ checkFalsy: true, nullable: true }).isArray(),
    body("sizes").optional({ checkFalsy: true, nullable: true }).isArray(),
    body("images").optional({ checkFalsy: true, nullable: true }).isArray(),
    body("category").optional({ checkFalsy: true, nullable: true }).isArray(),
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
  "product_id",
  "stock",
  "colors",
  "sizes",
  "images",
  "category",
  "discount_name",
  "discount",
];

module.exports = { productFields, productRules, productAttrRules };
