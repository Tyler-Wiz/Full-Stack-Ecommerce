const db = require("../../../config/index");

class ProductModel {
  static async create(data) {
    try {
      const statement = `INSERT INTO products(name,slug,description,sku,price,
                         category_id,discount_id,brand_id) 
                         VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*`;
      const values = [
        data.name,
        data.slug,
        data.description,
        data.sku,
        data.price,
        data.category_id,
        data.discount_id,
        data.brand_id,
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
      const statement = `SELECT * FROM products`;
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
      const statement = `SELECT p.id, p.name, p.slug, p.price, p.description, 
                        p.sku, pc.name as cat_name, br.name as br_name,
                        d.active as active_discount, d.discount_percent as percentage
                        FROM products p
                        INNER JOIN product_category pc ON p.category_id = pc.id
                        INNER JOIN brands br ON p.brand_id = br.id
                        INNER JOIN discounts d ON p.discount_id = d.id
                        WHERE p.id = $1`;
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
      const statement = `UPDATE products SET name = $1, description = $2,
                         price = $3, category_id = $4, discount_id = $5, 
                         brand_id = $6  WHERE id = $7`;
      const values = [
        data.name,
        data.description,
        data.price,
        data.category_id,
        data.discount_id,
        data.brand_id,
        data.id,
      ];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }

  // DELETE
  static async deleteProduct(id) {
    try {
      const statement = `DELETE FROM products WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductModel;
