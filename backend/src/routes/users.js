const express = require("express");
const router = express.Router();
const {
  read,
  deleteUser,
  readInfo,
  createUserInfo,
  updateUserInfo,
  updateUser,
} = require("../controllers/userController");
const validate = require("../validators/validate");
const { userInfoRules } = require("../validators/user/userInfo");
const validateFields = require("../validators/ValidateFields");
const { protectedUser } = require("../../config/protected");
const { userRules, userFields } = require("../validators/user/user");

// OPEN
router.get("/", read);
router.get("/:id", readInfo);

// PROTECTED
router.use(protectedUser);
router.post("/:id", userInfoRules(), validate, createUserInfo);
router.put(
  "/personal/:id",
  userRules(),
  validateFields(userFields),
  updateUser
);
router.delete("/:id", deleteUser);
router.put("/:id", userInfoRules(), validate, updateUserInfo);

module.exports = router;
