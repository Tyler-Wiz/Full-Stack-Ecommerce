const express = require("express");
const {
  findProduct,
  createCartItems,
  getCartItems,
  getSingleCartItem,
  deleteSingleCartItem,
} = require("../controllers/cartController");
const router = express.Router();
const protected = require("../../config/protected");

// OPEN ROUTES

router.get("/items", getCartItems);
router.get("/items/:id", getSingleCartItem);

// PROTECTED ROUTES
router.use(protected);
router.post("", findProduct, createCartItems);
router.delete("/items/:id", deleteSingleCartItem);

module.exports = router;
