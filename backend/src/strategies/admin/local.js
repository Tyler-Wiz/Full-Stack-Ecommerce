const passport = require("passport");
const localStrategy = require("passport-local");
const AdminModel = require("../../models/admin");
const { comparePasswords } = require("../../utils/bcrypt");

// Set method to serialize data to store in cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Set method to deserialize data stored in cookie and attach to req.user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await AdminModel.readById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "admin-local",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await AdminModel.readByUsername(username);
      if (!user) return done(null, false);
      const isValid = await comparePasswords(password, user.password);
      if (isValid) {
        return done(null, user);
      } else {
        done(ull, false);
      }
    } catch (error) {
      return done(error, null);
    }
  })
);
