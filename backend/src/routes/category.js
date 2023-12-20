const express = require("express");
const router = express.Router();
const validateFields = require("../validators/ValidateFields");
const {
  categoryRules,
  categoryFields,
} = require("../validators/product/shared");
const {
  createCat,
  getAllCat,
  getSingleCat,
  findCategory,
  updateCat,
  deleteCat,
} = require("../controllers/product/categoryController");

// OPEN
router.get("/", getAllCat);
router.get("/:id", findCategory, getSingleCat);

// PROTECTED
router.post("/", categoryRules(), validateFields(categoryFields), createCat);
router.put(
  "/:id",
  findCategory,
  categoryRules(),
  validateFields(categoryFields),
  updateCat
);
router.delete("/:id", deleteCat);

module.exports = router;