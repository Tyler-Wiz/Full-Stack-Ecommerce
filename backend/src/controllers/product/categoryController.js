const { ProductCategoryModel } = require("../../models/product/category");
const CreateError = require("http-errors");

// Category
exports.createCat = async (req, res, next) => {
  try {
    const category = await ProductCategoryModel.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
};

exports.getAllCat = async (req, res, next) => {
  try {
    const allCategory = await ProductCategoryModel.readAll();
    res.status(200).send(allCategory);
  } catch (error) {
    next(error);
  }
};

exports.findCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleCat = await ProductCategoryModel.readUnique(id);
    if (!singleCat) throw CreateError(404, "Category not found");
    req.singleCat = singleCat;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSingleCat = async (req, res) => {
  const singleCat = req.singleCat;
  res.status(200).send(singleCat);
};

exports.updateCat = async (req, res, next) => {
  try {
    const id = req.params.id;
    await ProductCategoryModel.update({ ...req.body, id });
    res.status(201).send(`Category ${req.body.name} updated`);
  } catch (error) {
    next(error);
  }
};

exports.deleteCat = async (req, res, next) => {
  try {
    const id = req.params.id;
    await ProductCategoryModel.delete(id);
    res.status(201).send(`Category ${req.body.name} deleted`);
  } catch (error) {
    next(error);
  }
};
