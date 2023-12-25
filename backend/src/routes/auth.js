const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgot,
  reset,
  deleteUser,
} = require("../controllers/authController");
const passport = require("passport");
const validate = require("../validators/validate");
const { userRegisterRules } = require("../validators/auth/auth");
const { loginResetRules } = require("../validators/auth/login");

router.post("/register", userRegisterRules(), validate, register);
router.post(
  "/login",
  loginResetRules(),
  validate,
  passport.authenticate("local"),
  login
);
router.post("/forgot", forgot);
router.post("/reset/:token", reset);

// Facebook Login
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/");
  }
);

// Google Login
router.get("/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.status(200).send("OK");
});

module.exports = router;
