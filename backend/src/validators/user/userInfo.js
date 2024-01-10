const { body } = require("express-validator");

const userInfoRules = () => {
  return [
    body("address_line1")
      .optional({ checkFalsy: true, nullable: true })
      .isLength({ min: 1 })
      .withMessage("Please enter minimum 10 characters"),
    body("address_line2")
      .optional({ checkFalsy: true, nullable: true })
      .isLength({ min: 5 })
      .withMessage("Please enter minimum 10 characters"),
    body("city")
      .optional({ checkFalsy: true, nullable: true })
      .isLength({ min: 3 })
      .withMessage("Please enter minimum 10 characters"),
    body("country")
      .optional({ checkFalsy: true, nullable: true })
      .isLength({ min: 2 })
      .withMessage("Please enter minimum 10 characters"),
    body("postal_code")
      .optional({ checkFalsy: true, nullable: true })
      .isLength({ min: 3 })
      .withMessage("Please enter minimum 10 characters"),
    body("telephone")
      .optional({ checkFalsy: true, nullable: true })
      .isLength({ min: 10, max: 12 })
      .withMessage("Mobile number should contains 10 digits"),
  ];
};

module.exports = {
  userInfoRules,
};
