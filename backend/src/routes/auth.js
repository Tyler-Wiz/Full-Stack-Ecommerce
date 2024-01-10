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
const getOAuthToken = require("../utils/genOAuthToken");

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
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const user = req.user;
    const authToken = getOAuthToken(user);
    res.cookie("authToken", authToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 2 * 3600 * 1000),
    });
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

router.get("/logout", function (req, res, next) {
  // Destroy the session to log the user out
  req.session.destroy((error) => {
    if (error) {
      next(error);
      res.status(500).send("Error logging out");
    } else {
      // Clear the user cookie
      res.clearCookie("authToken");
      res.redirect(`${process.env.CLIENT_URL}`);
    }
  });
});

module.exports = router;
