const express = require("express");
const {
  findProduct,
  createCartItems,
  getCartItems,
  deleteSingleCartQuantity,
  deleteSingleCartItem,
} = require("../controllers/cartController");
const router = express.Router();
// const { protectedUser } = require("../../config/protected");

// OPEN ROUTES
router.post("/items", getCartItems);

// PROTECTED ROUTES
router.post("", findProduct, createCartItems);
router.delete("/items/:id", deleteSingleCartItem);
router.post("/items/quantity/:id", deleteSingleCartQuantity);

module.exports = router;
