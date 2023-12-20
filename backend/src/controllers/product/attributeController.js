const {
  AttributeModel,
  AttributeOptionModel,
} = require("../../models/product/attributes");
const CreateError = require("http-errors");

exports.createAttr = async (req, res, next) => {
  try {
    const attribute = await AttributeModel.create(req.body.name);
    res.status(201).send(attribute);
  } catch (error) {
    next(error);
  }
};

exports.getAllAttr = async (req, res, next) => {
  try {
    const attributes = await AttributeModel.readAll();
    res.status(200).send(attributes);
  } catch (error) {
    next(error);
  }
};

exports.findAttribute = async (req, res, next) => {
  try {
    const id = req.params.id;
    const attribute = await AttributeModel.readUnique(id);
    if (!attribute) throw CreateError(404, "attribute not found");
    req.attribute = attribute;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSingleAttr = async (req, res, next) => {
  try {
    res.status(200).send(req.attribute);
  } catch (error) {
    next(error);
  }
};

exports.updateAttribute = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AttributeModel.update(req.body.name, id);
    res.status(200).send(`Attribute has been updated successfully`);
  } catch (error) {
    next(error);
  }
};

exports.deleteAttribute = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AttributeModel.deleteAttr(id);
    res.status(200).send(`Attribute has been deleted`);
  } catch (error) {
    next(error);
  }
};

// Attribute Option ------------------------------------------

exports.createAttrOption = async (req, res, next) => {
  try {
    const { attribute_id, value } = req.body;
    const attribute = await AttributeModel.readUnique(attribute_id);
    if (!attribute) throw CreateError(404, "attribute not found");
    const attributeOption = AttributeOptionModel.create(attribute_id, value);
    res.status(201).send(attributeOption);
  } catch (error) {
    next(error);
  }
};

exports.getAllOptions = async (req, res, next) => {
  try {
    const attributeOptions = await AttributeOptionModel.readAll();
    res.status(200).send(attributeOptions);
  } catch (error) {
    next(error);
  }
};

exports.findSingleOptions = async (req, res, next) => {
  try {
    const id = req.params.id;
    const attribute = await AttributeOptionModel.readUnique(id);
    if (!attribute) throw CreateError(404, "attribute not found");
    req.attribute = attribute;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSingleOption = async (req, res, next) => {
  try {
    res.status(200).send(req.attribute);
  } catch (error) {
    next(error);
  }
};

exports.updateSingleOption = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AttributeOptionModel.update({ ...req.body, id });
    res.status(200).send(`Attribute has been updated successfully`);
  } catch (error) {
    next(error);
  }
};
exports.deleteSingleOption = async (req, res, next) => {
  try {
    const id = req.params.id;
    await AttributeOptionModel.deletedAttrOption(id);
    res.status(200).send(`Attribute has been deleted successfully`);
  } catch (error) {
    next(error);
  }
};
