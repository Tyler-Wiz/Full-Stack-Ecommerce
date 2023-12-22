const db = require("../../../config/index");

class ProductRating {
  static async createRating(product_id, rating) {
    try {
      const statement = `INSERT INTO product_ratings (product_id, rating) VALUES($1, $2) RETURNING *`;
      const values = [product_id, rating];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async productRating(product_id) {
    try {
      const statement = `SELECT AVG(rating) as average_rating FROM product_ratings WHERE product_id = $1`;
      const values = [product_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductRating;
