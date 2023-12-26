const express = require("express");
const router = express.Router();
const {
  createDiscount,
  getAllDiscount,
  findDiscount,
  getSingleDiscount,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/product/discountController");
const validateFields = require("../validators/ValidateFields");
const {
  discountFields,
  discountRules,
  updateDiscountRules,
  updateDiscountFields,
} = require("../validators/product/shared");
const protected = require("../../config/protected");

// OPEN
router.get("", getAllDiscount);
router.get("/:id", findDiscount, getSingleDiscount);

// PROTECTED
router.use(protected);
router.post(
  "",
  discountRules(),
  validateFields(discountFields),
  createDiscount
);
router.put(
  "/:id",
  updateDiscountRules(),
  validateFields(updateDiscountFields),
  findDiscount,
  updateDiscount
);

router.delete("/:id", findDiscount, deleteDiscount);

module.exports = router;
