const express = require("express");
const {
  findProduct,
  createCartItems,
  getCartItems,
  getSingleCartItem,
  deleteSingleCartItem,
} = require("../controllers/cartController");
const router = express.Router();

router.post("", findProduct, createCartItems);
router.get("/items", getCartItems);
router.get("/items/:id", getSingleCartItem);
router.delete("/items/:id", deleteSingleCartItem);

module.exports = router;
