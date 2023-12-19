const express = require("express");
const router = express.Router();
const validate = require("../validators/validate");
const { categoryRules } = require("../validators/category");
const {
  createCat,
  getAllCat,
  getSingleCat,
  findCategory,
  updateCat,
  deleteCat,
} = require("../controllers/categoryController");

// Unprotected category routes
router.get("/category", getAllCat);
router.get("/category/:id", findCategory, getSingleCat);

// Protected category routes
router.post("/category", categoryRules(), validate, createCat);
router.put("/category/:id", findCategory, categoryRules(), validate, updateCat);
router.delete("/category/:id", deleteCat);

module.exports = router;
