const ProductModel = require("../../models/product/product");
const CreateError = require("http-errors");
const { generateSKU, generateSlug } = require("../../utils/generateSlugSku");
const ProductRating = require("../../models/product/rating");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
const bucketName = "tooxclusive-artist-profile";

// Product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, images } = req.body;
    const base64Images = images;
    const insertPromises = base64Images.map(async (image) => {
      const buf = Buffer.from(
        image.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const s3Params = {
        Bucket: bucketName,
        Key: `images/${image.name}`,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
        ACL: "public-read",
      };
      const s3UploadResult = await s3.upload(s3Params).promise();
      return s3UploadResult.Location;
    });
    const allImages = await Promise.all(insertPromises);
    const sku = generateSKU();
    const slug = generateSlug(name);
    const product = await ProductModel.create({
      ...req.body,
      sku,
      slug,
      images: allImages,
    });
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
    const slug = req.params.id;
    const product = await ProductModel.readUniqueBySlug(slug);
    if (!product) throw CreateError(404, "Product not found");
    res.status(200).send(product);
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
