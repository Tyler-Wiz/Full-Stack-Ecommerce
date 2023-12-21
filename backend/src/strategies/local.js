const passport = require("passport");
const localStrategy = require("passport-local");
const UserModel = require("../models/users");
const OAuthClass = require("../models/OAuth");
const { comparePasswords } = require("../utils/bcrypt");

// Set method to serialize data to store in cookie
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Set method to deserialize data stored in cookie and attach to req.user
passport.deserializeUser(async (username, done) => {
  try {
    const user = await UserModel.readByUsername(username);
    if (!user) done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "local",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.readByUsername(username);
      if (!user) return done(null, false);
      const isValid = await comparePasswords(password, user.password);
      if (isValid) {
        return done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      return done(error, null);
    }
  })
);
