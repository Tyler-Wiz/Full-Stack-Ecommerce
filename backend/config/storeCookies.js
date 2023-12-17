const genFunc = require("connect-pg-simple");
const session = require("express-session");

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DB_CONNECT,
});

module.exports = sessionStore;
