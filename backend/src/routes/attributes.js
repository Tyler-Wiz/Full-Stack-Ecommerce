const express = require("express");
const router = express.Router();
const {
  createAttr,
  getAllAttr,
  findAttribute,
  getSingleAttr,
  deleteAttribute,
  updateAttribute,
  createAttrOption,
  getAllOptions,
  findSingleOptions,
  getSingleOption,
  deleteSingleOption,
  updateSingleOption,
  createProductAttr,
} = require("../controllers/product/attributeController");
const {
  attributeRules,
  attributesFields,
  attributeOptionsRules,
} = require("../validators/product/attributes");
const validateFields = require("../validators/ValidateFields");

// PROTECTED -------------
router.post("", attributeRules(), validateFields(attributesFields), createAttr);
router.put(
  "/:id",
  attributeRules(),
  validateFields(attributesFields),
  findAttribute,
  updateAttribute
);
router.delete("/:id", findAttribute, deleteAttribute);

// Attribute Option
router.post(
  "/option",
  attributeOptionsRules(),
  validateFields(attributesFields),
  createAttrOption
);
router.put(
  "/option/:id",
  attributeOptionsRules(),
  validateFields(attributesFields),
  findSingleOptions,
  updateSingleOption
);
router.delete("/option/:id", findSingleOptions, deleteSingleOption);

// OPEN  -----------------------------------------
router.get("", getAllAttr);
router.get("/:id", findAttribute, getSingleAttr);

// Attribute Option
router.get("/option/all", getAllOptions);
router.get("/option/:id", findSingleOptions, getSingleOption);

module.exports = router;
