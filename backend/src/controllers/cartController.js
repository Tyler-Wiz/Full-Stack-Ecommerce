const { CartItemModel, CartModel } = require("../models/cart");
const CreateError = require("http-errors");
const ProductModel = require("../models/product/product");

exports.findProduct = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const product = await ProductModel.readUnique(product_id);
    if (!product) throw CreateError(404, "Product not found");
    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

const createCart = async (user) => {
  try {
    if (!user) throw CreateError(404, "Not Authorized");
    const { id } = user;
    const cart = await CartModel.readUniqueCart(id);
    if (!cart) {
      const userCart = await CartModel.create(id);
      return userCart;
    } else {
      return cart;
    }
  } catch (error) {
    next(error);
  }
};

exports.createCartItems = async (req, res, next) => {
  try {
    // get product ID
    const { product_id } = req.body;
    if (!product_id) throw CreateError(400, "No Product Added");
    // Get user from session
    const user = req.user;
    // Create or Retrieve User Cart
    const cart = await createCart(user);
    // Check if Product Exist in User CartItem
    const itemInCart = await CartItemModel.checkIfItemExist(
      product_id,
      cart.id
    );
    // If Product exist Increment product or Add Product if false
    if (itemInCart.count > 0) {
      await CartItemModel.incrementItemBy1(product_id, cart.id);
      res.status(200).send("Product Added");
    } else {
      const addItemToCart = await CartItemModel.addItemToCart(
        cart.id,
        product_id
      );
      res.send(addItemToCart);
    }
  } catch (error) {
    next(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  const user = req.user;
  try {
    // Get user cart by ID from session
    const cart = await createCart(user);
    //Retrieve all Items in User Cart
    const cartItems = await CartItemModel.loadCartItems(cart.id);
    if (cartItems === null) {
      res.send("no Items in cart");
    } else {
      res.send(cartItems);
    }
  } catch (error) {
    next(error);
  }
};

exports.getSingleCartItem = async (req, res, next) => {
  try {
    const cart_item_id = req.params.id;
    //Retrieve all Single Item in User Cart
    const cartItem = await CartItemModel.findUniqueItem(cart_item_id);
    if (!cartItem) throw CreateError(400, "Cart item not found");
    res.send(cartItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteSingleCartItem = async (req, res, next) => {
  try {
    const cart_item_id = req.params.id;
    await CartItemModel.deleteUniqueItem(cart_item_id);
    res.status(200).send("Cart item deleted successfully");
  } catch (error) {
    next(error);
  }
};
