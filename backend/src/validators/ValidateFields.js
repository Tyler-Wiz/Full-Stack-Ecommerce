const { validationResult } = require("express-validator");

// Custom validation middleware
const validateFields = (allowedFields) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));

      return res.status(422).json({
        error: extractedErrors,
      });
    }
    const filteredData = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredData[key] = req.body[key];
      }
    });
    req.body = filteredData;
    next();
  };
};

module.exports = validateFields;
