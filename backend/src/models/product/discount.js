const db = require("../../../config/index");

class DiscountModel {
  // CREATE
  static async create(data) {
    try {
      const statement = `INSERT INTO discounts(name, description, discount_percent, active)
                           VALUES($1, $2, $3, $4) RETURNING *`;
      const values = [
        data.name,
        data.description,
        data.discount_percent,
        data.active,
      ];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  // READ
  static async readAll() {
    try {
      const statement = `SELECT name, description, discount_percent, active
                         FROM discounts`;
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
      const statement = `SELECT name, description, discount_percent, active
                         FROM discounts WHERE id = $1`;
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

  // UPDATE

  static async update(data) {
    try {
      const statement = `UPDATE discounts SET active = $1, discount_percent = $2
                         WHERE id = $3`;
      const values = [data.active, data.discount_percent, data.id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }

  // DELETE
  static async deleteUnique(id) {
    try {
      const statement = `DELETE FROM discounts WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = DiscountModel;
