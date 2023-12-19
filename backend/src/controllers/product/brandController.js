const BrandModel = require("../../models/product/brand");
const CreateError = require("http-errors");

exports.createBrand = async (req, res, next) => {
  try {
    const brand = await BrandModel.create(req.body.name);
    res.status(201).send(brand);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const brands = await BrandModel.readAll();
    res.status(200).send(brands);
  } catch (error) {
    next(error);
  }
};

exports.findBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleBrand = await BrandModel.readUnique(id);
    if (!singleBrand) throw CreateError(404, "Brand not found");
    req.singleBrand = singleBrand;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSingleBrand = async (req, res, next) => {
  try {
    res.status(200).send(req.singleBrand);
  } catch (error) {
    next(error);
  }
};

exports.updateBrand = async (req, res, next) => {
  const id = req.params.id;
  try {
    await BrandModel.update(req.body.name, id);
    res.status(201).send("Brand updated successfully");
  } catch (error) {
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    await BrandModel.delete(req.singleBrand.id);
    res.status(201).send("Brand deleted successfully");
  } catch (error) {
    next(error);
  }
};
