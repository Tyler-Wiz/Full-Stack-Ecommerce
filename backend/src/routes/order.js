const express = require("express");
const {
  createOrder,
  getOrderByUser,
  deleteOrderByUser,
  checkoutOrder,
  getOrder,
} = require("../controllers/orderController");
const router = express.Router();
const protected = require("../../config/protected");

// OPEN
router.get("", getOrder, getOrderByUser);

// PROTECTED
router.use(protected);
router.post("", createOrder);
router.delete("/:id", deleteOrderByUser);
router.post("/checkout", getOrder, checkoutOrder);

module.exports = router;
