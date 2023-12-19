const ProductModel = require("../../models/product/product");
const CreateError = require("http-errors");
const { generateSKU, generateSlug } = require("../../utils/generateSlugSku");

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
    console.log({ ...req.body, id });
    await ProductModel.update({ ...req.body, id });
    res.status(200).send("Product updated");
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
