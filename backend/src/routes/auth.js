const express = require("express");
const {
  register,
  login,
  forgot,
  reset,
  deleteUser,
} = require("../controllers/authController");
const passport = require("passport");
const validate = require("../validators/validate");
const { userRegisterRules } = require("../validators/authValidator");
const { loginResetRules } = require("../validators/loginValidator");

const router = express.Router();

router.post("/register", userRegisterRules(), validate, register);
router.post(
  "/login",
  loginResetRules(),
  validate,
  passport.authenticate("local"),
  login
);
router.post("/forgot", forgot);
router.post("/reset/:token", loginResetRules(), validate, reset);
router.delete("/:id", deleteUser);

// Facebook Login
router.get("/facebook", passport.authenticate("facebook"), (req, res) => {});
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/");
  }
);

// Google Login

router.get("/google", passport.authenticate("google"), (req, res) => {});
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.status(200).send("OK");
});

module.exports = router;
