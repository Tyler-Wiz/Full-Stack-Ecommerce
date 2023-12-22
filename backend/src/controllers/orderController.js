const orderModel = require("../models/order");
const { CartItemModel, CartModel } = require("../models/cart");
const CreateError = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

exports.createOrder = async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const cart = await CartModel.readUniqueCart(id);
    if (!cart) throw CreateError(404, `Cart for ${username} not found`);
    // Create a new order
    const order = await orderModel.create(cart.id);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const cart = await CartModel.readUniqueCart(id);
    if (!cart) throw CreateError(404, `Cart for ${username} not found`);
    const order = await orderModel.findOrderByUser(cart.id);
    if (!order) throw CreateError(404, `Order for ${username} not found`);
    const orderItems = await CartItemModel.loadCartItems(cart.id);
    if (!orderItems)
      throw CreateError(404, `Order Items for ${username} not found`);
    const totalPrice = orderItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    req.orderItems = orderItems;
    req.totalPrice = totalPrice;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getOrderByUser = async (req, res, next) => {
  const orderItems = req.orderItems;
  const totalPrice = req.totalPrice;
  try {
    res.status(200).send({
      orderItems,
      totalPrice,
    });
    next();
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderByUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findOrderById(id);
    if (!order) throw CreateError(404, `Order for not found`);
    await orderModel.deleteOrder(id);
    res.status(200).send(`order deleted successfully`);
  } catch (error) {
    next(error);
  }
};

exports.checkoutOrder = async (req, res, next) => {
  try {
    const amount = Math.ceil(req.totalPrice);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};
