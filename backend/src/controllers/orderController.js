const orderModel = require("../models/order");
const { CartItemModel, CartModel } = require("../models/cart");
const CreateError = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

exports.createOrder = async (req, res, next) => {
  const { order_items } = req.body;
  try {
    const { id, username } = req.user;
    const cart = await CartModel.readUniqueCart(id);
    if (!cart) throw CreateError(404, `Cart for ${username} not found`);
    // Create a new order
    const order = await orderModel.create(order_items);
    if (order) {
      // Delete Cart Items
      const deleteCartItems = await CartModel.deleteCartItems(cart.id);
    }
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

exports.checkout = async (req, res, next) => {
  const { user_id, cart } = req.body;
  const line_items = cart.map((item) => {
    let price;
    if (item.discount) {
      price = item.price - item.price * (item.discount / 100);
    } else {
      price = item.price;
    }
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.images[0]],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: (price * 100).toFixed(0),
      },
      quantity: item.cartquantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 100, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/successful`,
    cancel_url: `${process.env.CLIENT_URL}/cart/${user_id}`,
  });

  res.send({ url: session.url });
};
