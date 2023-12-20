const db = require("../../config/index");

class ImageModel {
  static async upload(product_id, title, url) {
    try {
      const statement = `INSERT INTO images (product_id, title, url) 
                        VALUES($1,$2,$3) RETURNING*`;
      const values = [product_id, title, url];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readAllByProduct(product_id) {
    try {
      const statement = `SELECT * FROM images WHERE product_id = $1`;
      const values = [product_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ImageModel;
