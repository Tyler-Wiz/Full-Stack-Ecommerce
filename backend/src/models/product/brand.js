const db = require("../../../config/index");

class BrandModel {
  // Create
  static async create(name) {
    try {
      const statement = `INSERT INTO brands(name) VALUES($1) RETURNING *`;
      const values = [name];
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
      const statement = `SELECT id, name FROM brands`;
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
      const statement = `SELECT id, name FROM brands WHERE id = $1`;
      const values = [id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Update
  static async update(name, id) {
    try {
      const statement = `UPDATE brands SET name = $1 WHERE id = $2`;
      const values = [name, id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Delete
  static async delete(id) {
    try {
      const statement = `DELETE FROM brands WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = BrandModel;
