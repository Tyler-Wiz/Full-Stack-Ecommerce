const express = require("express");
const router = express.Router();
const {
  productFields,
  productRules,
  productAttrRules,
} = require("../validators/product/product");
const validateFields = require("../validators/ValidateFields");
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  createProductAttr,
  getProductAttributes,
  deleteProductAttribute,
  createProductRating,
  getProductRating,
} = require("../controllers/product/productController");

// PROTECTED ----------------------------

// Product
router.post("", productRules(), validateFields(productFields), createProduct);
router.put(
  "/:id",
  productRules(),
  validateFields(productFields),
  findProduct,
  updateProduct
);
router.delete("/:id", findProduct, deleteProduct);

// Product Attributes
router.post(
  "/attributes",
  productAttrRules(),
  validateFields(productFields),
  createProductAttr
);
router.delete("/attributes/:id", deleteProductAttribute);

// OPEN -----------------------------------

// Product
router.get("", getAllProducts);
router.get("/:id", findProduct, getSingleProduct);

// Product Attributes
router.get("/attributes/:id", getProductAttributes);

// Product Rating
router.post("/:id/rating", findProduct, createProductRating);
router.get("/:id/rating", findProduct, getProductRating);

module.exports = router;
