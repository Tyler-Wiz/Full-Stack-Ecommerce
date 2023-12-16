const { Client } = require("pg");
const { DB } = require("./config");

(async () => {
  const createDatabaseTables = [
    `CREATE TABLE IF NOT EXISTS admin_user (
        id             SERIAL PRIMARY KEY,
        username       varchar(255) NOT NULL,
        password       varchar(255) NOT NULL,
        email          varchar(255) NOT NULL,
        first_name     varchar(255) NOT NULL,
        last_name      varchar(255) NOT NULL,
        isAdmin        boolean NOT NULL,
        last_login     DATE NOT NULL DEFAULT CURRENT_DATE,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
    );`,
    `CREATE TABLE IF NOT EXISTS customers (
        id             SERIAL PRIMARY KEY,
        username       varchar(255) NOT NULL,
        password       varchar(255) NOT NULL,
        email          varchar(255) NOT NULL,
        first_name     varchar(255) NOT NULL,
        last_name      varchar(255) NOT NULL,
        telephone      INTEGER NOT NULL,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE
      );`,
    `CREATE TABLE IF NOT EXISTS customers_address (
        id             SERIAL PRIMARY KEY,
        customer_id    INTEGER NOT NULL,
        address_line1  varchar(255),
        address_line2  varchar(255),
        city           varchar(255),
        postal_code    varchar(255),
        country        varchar(255),
        telephone      varchar,
        FOREIGN KEY    (customer_id) REFERENCES customers(id) 
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
        attribute_id   INTEGER,
        value          varchar(255) NOT NULL,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY    (attribute_id) REFERENCES attributes(id) 
    );`,
    `CREATE TABLE IF NOT EXISTS products (
        id             SERIAL PRIMARY KEY,
        name           varchar,
        description    TEXT,
        SKU            varchar,
        category_id    INTEGER,
        price          Decimal,
        discount_id    INTEGER,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY    (category_id) REFERENCES product_category(id),
        FOREIGN KEY    (discount_id) REFERENCES discounts(id) 
    );`,
    `CREATE TABLE IF NOT EXISTS product_attributes(
        id              SERIAL PRIMARY KEY,
        product_id      INTEGER,
        att_options_id  INTEGER,
        FOREIGN KEY    (product_id) REFERENCES products(id), 
        FOREIGN KEY    (att_options_id) REFERENCES attributes_options(id) 
    );`,
    `CREATE TABLE IF NOT EXISTS images(
        id              SERIAL PRIMARY KEY,
        product_id      INTEGER,
        title           varchar,
        full_url        text,
        FOREIGN KEY    (product_id) REFERENCES products(id)
    );`,
    `CREATE TABLE IF NOT EXISTS cart_item (
        id              SERIAL PRIMARY KEY,
        quantity        INTEGER,
        product_id      INTEGER,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY    (product_id) REFERENCES products(id)
    );`,
    `CREATE TABLE IF NOT EXISTS order_details (
        id              SERIAL PRIMARY KEY,
        customer_id     INTEGER,
        product_id      INTEGER,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY    (product_id) REFERENCES products(id),
        FOREIGN KEY    (customer_id) REFERENCES customers(id)
    );`,
    `CREATE TABLE IF NOT EXISTS order_items (
        id              SERIAL PRIMARY KEY,
        quantity        INTEGER,
        order_id        INTEGER,
        product_id      INTEGER,
        created_at     DATE NOT NULL DEFAULT CURRENT_DATE,
        modified_at    DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY    (product_id) REFERENCES products(id),
        FOREIGN KEY    (order_id) REFERENCES order_details(id)
    );`,
    `CREATE TABLE IF NOT EXISTS session (
        sid           VARCHAR(255) PRIMARY KEY,
        sess          JSON,
        expire        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
