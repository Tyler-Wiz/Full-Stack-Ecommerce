const UserModel = require("../models/users");
const CreateError = require("http-errors");

exports.createUserInfo = async (req, res, next) => {
  const user_id = req.params.id;
  try {
    // find user by Id
    const user = await UserModel.readById(user_id);

    // if User is not found Throw an error
    if (!user) throw CreateError(400, `User doesn't exists`);

    // Send User info to the database
    const userInfo = await UserModel.createUserInfo({ ...req.body, user_id });

    res.send(userInfo);
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const users = await UserModel.readAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.readInfo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserModel.readInfoById(id);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await UserModel.delete(id);
  } catch (error) {
    next(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  const user_id = req.params.id;
  try {
    // find user by Id
    const user = await UserModel.readById(user_id);

    // if User is not found Throw an error
    if (!user) throw CreateError(400, `User doesn't exists`);

    // Update User info to the database
    await UserModel.updateUserInfo({ ...req.body, user_id });

    res.status(201).send("User info updated");
  } catch (error) {}
};
