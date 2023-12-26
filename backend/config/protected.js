const createError = require("http-errors");

const protected = (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "You are not logged in");
    } else if (!req.user.is_admin) {
      throw createError(401, "You are not an admin");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = protected;
