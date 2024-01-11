const express = require("express");
const {
  createOrder,
  getOrderByUser,
  deleteOrderByUser,
  checkout,
  getOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { protectedUser } = require("../../config/protected");

// OPEN
router.get("", getOrder, getOrderByUser);

// PROTECTED
router.use(protectedUser);
router.post("", createOrder);
router.delete("/:id", deleteOrderByUser);
router.post("/create-checkout-session", checkout);

module.exports = router;
