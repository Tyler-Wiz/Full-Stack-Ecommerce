const DiscountModel = require("../../models/product/discount");
const CreateError = require("http-errors");

exports.createDiscount = async (req, res, next) => {
  try {
    const discount = await DiscountModel.create(req.body);
    res.status(200).send(discount);
  } catch (error) {
    next(error);
  }
};

exports.getAllDiscount = async (req, res, next) => {
  try {
    const discounts = await DiscountModel.readAll();
    res.status(200).send(discounts);
  } catch (error) {
    next(error);
  }
};

exports.findDiscount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const discount = await DiscountModel.readUnique(id);
    if (!discount) throw CreateError(404, "Discount not found");
    req.discount = discount;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSingleDiscount = async (req, res, next) => {
  try {
    res.status(200).send(req.discount);
  } catch (error) {
    next(error);
  }
};

exports.updateDiscount = async (req, res, next) => {
  const id = req.params.id;
  try {
    await DiscountModel.update({ ...req.body, id });
    res.status(201).send(`Discount ${req.discount.name} updated`);
  } catch (error) {
    next(error);
  }
};

exports.deleteDiscount = async (req, res, next) => {
  const id = req.params.id;
  try {
    await DiscountModel.deleteUnique(id);
    res.status(201).send(`Discount ${req.discount.name} deleted`);
  } catch (error) {
    next(error);
  }
};
