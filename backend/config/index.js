const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_CONNECT,
});

db.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Successfully connected to postgres database!");
  }
});

module.exports = db;
