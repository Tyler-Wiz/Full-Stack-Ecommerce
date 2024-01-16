const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const { SESSION_KEY } = require("./config");
require("../src/strategies/local");
require("../src/strategies/google");

const genFunc = require("connect-pg-simple");
const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DB_CONNECT,
});

module.exports = (app) => {
  app.use(
    cors({
      origin: [
        "https://full-stack-ecommerce-sable.vercel.app",
        "http://localhost:3000",
      ],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
      credentials: true,
    })
  );

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser(SESSION_KEY));
  app.use(
    session({
      secret: SESSION_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: 1 * 4 * 3600 * 1000,
      },
      store: sessionStore,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};
