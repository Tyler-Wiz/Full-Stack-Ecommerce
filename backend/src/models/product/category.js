const db = require("../../../config/index");

class ProductCategoryModel {
  // Create
  static async create(data) {
    try {
      const statement = `INSERT INTO product_category (name, description) 
                         VALUES($1, $2) RETURNING*`;
      const values = [data.name, data.description];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Read
  static async readAll() {
    try {
      const statement = `SELECT * FROM product_category`;
      const values = [];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readUnique(id) {
    try {
      const statement = `SELECT * FROM product_category c
                         JOIN products p ON p.category_id = c.id
                         WHERE c.id = $1`;
      const values = [id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Update
  static async update(data) {
    try {
      const statement = `UPDATE product_category SET name = $1, description = $2 WHERE id = $3`;
      const values = [data.name, data.description, data.id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Delete
  static async delete(id) {
    try {
      const statement = `DELETE FROM product_category WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { ProductCategoryModel };
