const ImageModel = require("../../src/models/image");
const CreateError = require("http-errors");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
const bucketName = "tooxclusive-artist-profile";

exports.uploadImage = async (req, res, next) => {
  try {
    const { product_id, images } = req.body;
    const base64Images = images;
    const insertPromises = base64Images.map(async (image) => {
      const s3Params = {
        Bucket: bucketName,
        Key: `images/${image.name}`,
        Body: Buffer.from(image.image, "base64"),
        ContentType: "image/png", // Adjust the content type based on your image format
      };
      const s3UploadResult = await s3.upload(s3Params).promise();
      await ImageModel.upload(product_id, image.name, s3UploadResult.Location);
    });
    await Promise.all(insertPromises);
    res.status(200).send("images uploaded successfully");
  } catch (error) {
    next(error);
  }
};

exports.getAllProductImgs = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const productImages = await ImageModel.readAllByProduct(product_id);
    if (!productImages)
      throw CreateError(404, "Images don't exist for product");
    res.status(200).send(productImages);
  } catch (error) {
    next(error);
  }
};
