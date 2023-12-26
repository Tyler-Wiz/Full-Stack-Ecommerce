const express = require("express");
const router = express.Router();
const {
  read,
  deleteUser,
  readInfo,
  createUserInfo,
  updateUserInfo,
} = require("../controllers/userController");
const validate = require("../validators/validate");
const { userInfoRules } = require("../validators/user/userInfo");
const protected = require("../../config/protected");

// OPEN
router.get("/", read);
router.get("/:id", readInfo);

// PROTECTED
router.use(protected);
router.post("/:id", userInfoRules(), validate, createUserInfo);
router.delete("/:id", deleteUser);
router.put("/:id", userInfoRules(), validate, updateUserInfo);

module.exports = router;
