const ProductModel = require("../../models/product/product");
const {
  AttributeOptionModel,
  ProductAttributes,
} = require("../../models/product/attributes");
const CreateError = require("http-errors");
const { generateSKU, generateSlug } = require("../../utils/generateSlugSku");
const ProductRating = require("../../models/product/rating");

// Product
exports.createProduct = async (req, res, next) => {
  const { name } = req.body;
  try {
    const sku = generateSKU();
    const slug = generateSlug(name);
    const product = await ProductModel.create({ ...req.body, sku, slug });
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.readAll();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

exports.findProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.readUnique(id);
    if (!product) throw CreateError(404, "Product not found");
    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    res.status(200).send(req.product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.product.id;
    const product = await ProductModel.update({ ...req.body, id });
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.product.id;
    await ProductModel.deleteProduct(id);
    res.status(200).send("Product deleted");
  } catch (error) {
    next(error);
  }
};

// Product Attributes -------------

exports.createProductAttr = async (req, res, next) => {
  try {
    const { product_id, att_options_id } = req.body;
    const product = await ProductModel.readUnique(product_id);
    if (!product) throw CreateError(404, "Product not found");
    const attributeOption = await AttributeOptionModel.readUnique(
      att_options_id
    );
    if (!attributeOption) throw CreateError(404, "Attribute not found");
    const productAttribute = await ProductAttributes.create(
      product_id,
      att_options_id
    );
    res.status(201).send(productAttribute);
  } catch (error) {
    next(error);
  }
};

exports.getProductAttributes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.readUnique(id);
    if (!product) throw CreateError(404, "Product not found");
    const attributes = await ProductAttributes.readProductAttributes(id);
    res.status(200).send(attributes);
  } catch (error) {
    next(error);
  }
};

exports.deleteProductAttribute = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductAttributes.deleteUnique(id);
    if (!product) throw CreateError(404, "Product not found");
    res.status(200).send("Product Attributes deleted");
  } catch (error) {
    next(error);
  }
};

// Product Ratings

exports.createProductRating = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const { rating } = req.body;
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw CreateError(400, "Invalid rating value");
    }
    const newRating = await ProductRating.createRating(product_id, rating);
    res.status(200).send(newRating);
  } catch (error) {
    next(error);
  }
};

exports.getProductRating = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const averageRating = await ProductRating.productRating(product_id);
    res.status(200).send(averageRating);
  } catch (error) {
    next(error);
  }
};
