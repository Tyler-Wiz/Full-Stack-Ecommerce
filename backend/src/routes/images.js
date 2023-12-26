const express = require("express");
const {
  uploadImage,
  getAllProductImgs,
} = require("../controllers/imageController");
const router = express.Router();
const protected = require("../../config/protected");

router.get("/:id", getAllProductImgs);

router.use(protected);
router.post("", uploadImage);

module.exports = router;
