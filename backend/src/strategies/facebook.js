const FBStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const OAuthClass = require("../models/OAuth");
const convertToInteger = require("../utils/convertToInteger");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await OAuthClass.readById(id);
    if (!user) done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  "facebook",
  new FBStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:4002/auth/facebook/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = convertToInteger(profile.id);
      try {
        const user = await OAuthClass.readById(id);
        if (user) {
          return done(null, user);
        } else {
          const user = await OAuthClass.create(
            id,
            profile.displayName,
            "",
            profile.provider
          );
          return done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
