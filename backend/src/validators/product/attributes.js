const { body } = require("express-validator");

const attributeRules = () => {
  return [
    body("name").notEmpty().withMessage("attribute name must be specified"),
  ];
};
const attributeOptionsRules = () => {
  return [
    body("value").notEmpty().withMessage("attribute value must be specified"),
    body("attribute_id")
      .notEmpty()
      .isInt({ max: 100 })
      .withMessage("attribute id must be specified"),
  ];
};

// allowedFields
const attributesFields = [
  "name",
  "attribute_id",
  "value",
  "product_id",
  "att_options_id",
];

module.exports = { attributeRules, attributesFields, attributeOptionsRules };
