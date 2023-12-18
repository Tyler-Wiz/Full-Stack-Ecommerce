const { Client } = require("pg");
const { DB } = require("./config");

(async () => {
  const createDatabaseTables = [
    `CREATE TABLE IF NOT EXISTS users (
        id             BIGSERIAL PRIMARY KEY,
        username       varchar(255) NOT NULL,
        password       varchar(255) NOT NULL,
        email          varchar(255) NOT NULL,
        first_name     varchar(255),
        last_name      varchar(255),
        is_admin       boolean,
        last_login     DATE NOT NULL DEFAULT CURRENT_DATE,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS user_token (
        id             SERIAL PRIMARY KEY,
        user_id        INTEGER REFERENCES users(id),
        token_value    VARCHAR(255) NOT NULL,
        expire         TIMESTAMP NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS user_address (
        id             SERIAL PRIMARY KEY,
        user_id        INTEGER REFERENCES users(id),
        address_line1  varchar(255),
        address_line2  varchar(255),
        city           varchar(255),
        postal_code    varchar(255),
        country        varchar(255),
        telephone      varchar
    );`,
    `CREATE TABLE IF NOT EXISTS product_category (
        id             SERIAL PRIMARY KEY,
        name           varchar(255) NOT NULL,
        description    TEXT,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        deleted_at     DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS discounts (
        id             SERIAL PRIMARY KEY,
        name           varchar(255) NOT NULL,
        description         TEXT,
        discount_percent  decimal,
        active         boolean,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        deleted_at     DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS attributes (
        id             SERIAL PRIMARY KEY,
        name           varchar(255) NOT NULL,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS attributes_options (
        id             SERIAL PRIMARY KEY,
        attribute_id   INTEGER REFERENCES attributes(id),
        value          varchar(255) NOT NULL,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS products (
        id             SERIAL PRIMARY KEY,
        name           varchar(255) NOT NULL,
        slug           varchar(255) NOT NULL,
        description    TEXT NOT NULL,
        SKU            varchar NOT NULL,
        category_id    INTEGER REFERENCES product_category(id),
        price          Decimal,
        discount_id    INTEGER REFERENCES discounts(id),
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS product_attributes(
        id              SERIAL PRIMARY KEY,
        product_id      INTEGER REFERENCES products(id),
        att_options_id  INTEGER REFERENCES attributes_options(id)
    );`,
    `CREATE TABLE IF NOT EXISTS images(
        id              SERIAL PRIMARY KEY,
        product_id      INTEGER REFERENCES products(id),
        title           varchar,
        url             text
    );`,
    `CREATE TABLE IF NOT EXISTS cart (
       id              SERIAL PRIMARY KEY,
       user_id         INTEGER REFERENCES users(id),
       created_at      DATE NOT NULL DEFAULT CURRENT_DATE,
       modified_at     DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS cart_items (
       id              SERIAL PRIMARY KEY,
       cart_id         INTEGER REFERENCES cart(id),
       product_id      INTEGER REFERENCES products(id),
       quantity        INTEGER DEFAULT 1
    );`,
    `CREATE TABLE IF NOT EXISTS orders (
       id             SERIAL PRIMARY KEY,
       cart_id        INTEGER REFERENCES cart(id),
       created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
       modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS session (
       sid             VARCHAR(255) PRIMARY KEY,
       sess            JSON ,
       expire          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS Oauth_users (
      id              varchar,
      name            VARCHAR(255) NOT NULL,
      email           varchar(255),
      provider        varchar(255),
      created_at      DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
  ];

  try {
    const db = new Client({
      user: DB.PG_USER,
      host: DB.PG_HOST,
      database: DB.PG_DATABASE,
      password: DB.PG_PASSWORD,
      port: DB.PG_PORT,
      ssl: true,
    });

    await db.connect();

    for (const query of createDatabaseTables) {
      await db.query(query);
    }

    await db.end();
  } catch (error) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", error);
  }
})();
