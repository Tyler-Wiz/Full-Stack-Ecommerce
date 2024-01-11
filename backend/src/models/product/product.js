const db = require("../../../config/index");

class ProductModel {
  static async create(data) {
    try {
      const statement = `INSERT INTO products(name,slug,description,sku,price,
                                     stock,colors,sizes,images,category,discount,discount_name) 
                         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING*`;
      const values = [
        data.name,
        data.slug,
        data.description,
        data.sku,
        data.price,
        data.stock,
        data.colors,
        data.sizes,
        data.images,
        data.category,
        data.discount,
        data.discount_name,
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
      const statement = `SELECT * FROM products
                         WHERE id = $1`;
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

  static async readUniqueBySlug(slug) {
    try {
      const statement = `SELECT * FROM products
                         WHERE slug = $1`;
      const values = [slug];
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
                         price = $3, stock = $4, category_id = $5,
                         discount_id = $6, brand_id = $7  WHERE id = $8 RETURNING *`;
      const values = [
        data.name,
        data.description,
        data.price,
        data.stock,
        data.category_id,
        data.discount_id,
        data.brand_id,
        data.id,
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

  static async updateStock(id) {
    try {
      const statement = `UPDATE products SET stock = stock - 1 WHERE id = $1 RETURNING *`;
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
