const express = require("express");
const {
  createOrder,
  getOrderByUser,
  deleteOrderByUser,
  checkoutOrder,
  getOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.post("", createOrder);
router.get("", getOrder, getOrderByUser);
router.delete("/:id", deleteOrderByUser);
router.post("/checkout", getOrder, checkoutOrder);

module.exports = router;
