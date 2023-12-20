const express = require("express");
const {
  uploadImage,
  getAllProductImgs,
} = require("../controllers/imageController");
const router = express.Router();

router.post("", uploadImage);
router.get("/:id", getAllProductImgs);

module.exports = router;
