const express = require("express");
const router = express.Router();
const {
  productFields,
  productRules,
} = require("../validators/product/product");
const validateFields = require("../validators/ValidateFields");
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
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

// Product
router.get("", getAllProducts);
router.get("/:id", findProduct, getSingleProduct);

module.exports = router;
