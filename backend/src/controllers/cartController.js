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

const createCart = async (user_id) => {
  const id = user_id;
  try {
    const cart = await CartModel.readUniqueCart(id);
    if (!cart) {
      const userCart = await CartModel.create(id);
      return userCart;
    } else if (cart.length > 0) {
      const pendingCart = cart.find((cart) => cart.status === "pending");
      if (pendingCart) {
        return pendingCart;
      } else {
        const userCart = await CartModel.create(id);
        return userCart;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createCartItems = async (req, res, next) => {
  try {
    // get product ID
    const { product_id, selected_size, selected_color, user_id } = req.body;
    if (!product_id) throw CreateError(400, "No Product Added");
    // Create or Retrieve User Cart
    if (!user_id) throw CreateError(400, "Must be logged in to add to cart");
    const cart = await createCart(user_id);
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
        product_id,
        selected_size,
        selected_color
      );
      res.send(addItemToCart);
    }
  } catch (error) {
    next(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  const id = req.body.id;
  try {
    // Get user cart by ID from session
    const cart = await CartModel.readUniqueCart(id);
    if (!cart) throw CreateError(404, "Not Cart For User");
    const pendingCart = cart.find((cart) => cart.status === "pending");
    // Retrieve all Items in User Cart
    const cartItems = await CartItemModel.loadCartItems(pendingCart.id);
    if (cartItems === null) {
      res.send([]);
    } else {
      res.send(cartItems);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteSingleCartQuantity = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const cart_item_id = req.params.id;
    const product = await CartItemModel.findUniqueItem(cart_item_id);
    const { product_id } = product;
    // Create or Retrieve User Cart
    const cart = await createCart(user_id);
    // Check if Product Exist in User Cart
    const cartQuantity = await CartItemModel.cartQuantity(product_id, cart.id);
    if (cartQuantity.cartquantity > 1) {
      await CartItemModel.decrementItemBy1(product_id, cart.id);
      res.status(200).send("Product Removed");
    } else {
      await CartItemModel.deleteUniqueItem(cart_item_id);
      res.status(200).send("Product Removed");
    }
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
