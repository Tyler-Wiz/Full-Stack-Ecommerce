const express = require("express");
const {
  register,
  login,
  forgot,
  reset,
  deleteUser,
} = require("../controllers/adminController");
const passport = require("passport");
const validate = require("../validators/validate");
const { userRegisterRules } = require("../validators/authValidator");
const { loginResetRules } = require("../validators/loginValidator");

const router = express.Router();

router.post("/admin/register", userRegisterRules(), validate, register);
router.post(
  "/admin/login",
  loginResetRules(),
  validate,
  passport.authenticate("admin-local"),
  login
);
router.post("/admin/forgot", forgot);
router.post("/admin/reset/:token", loginResetRules(), validate, reset);
router.delete("/admin/:id", deleteUser);

module.exports = router;
