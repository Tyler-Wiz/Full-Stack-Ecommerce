const express = require("express");
const {
  createBrand,
  getAll,
  findBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/product/brandController");
const router = express.Router();
const { brandRules, brandFields } = require("../validators/product/shared");
const validateFields = require("../validators/ValidateFields");

// OPEN
router.get("/", getAll);
router.get("/:id", findBrand, getSingleBrand);

// PROTECTED
router.post("/", brandRules(), validateFields(brandFields), createBrand);
router.put(
  "/:id",
  brandRules(),
  validateFields(brandFields),
  findBrand,
  updateBrand
);
router.delete("/:id", findBrand, deleteBrand);

module.exports = router;
