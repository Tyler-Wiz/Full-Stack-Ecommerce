const express = require("express");
const {
  createOrder,
  getOrderByUser,
  checkout,
} = require("../controllers/orderController");
const router = express.Router();
// const { protectedUser } = require("../../config/protected");

// OPEN
router.get("/:id", getOrderByUser);

// PROTECTED
router.post("", createOrder);
router.post("/create-checkout-session", checkout);

module.exports = router;
