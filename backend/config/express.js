const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const sessionStore = require("./storeCookies");
const cors = require("cors");
const { SESSION_KEY } = require("./config");
require("../src/strategies/local");
require("../src/strategies/facebook");

module.exports = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
      credentials: true,
    })
  );

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.use(
    session({
      secret: SESSION_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: 7 * 24 * 3600 * 1000,
      },
      store: sessionStore,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};
