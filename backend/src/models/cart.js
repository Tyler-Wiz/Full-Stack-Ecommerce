const db = require("../../config/index");

class CartModel {
  static async create(user_id) {
    try {
      const statement = `INSERT INTO cart (user_id) VALUES ($1) RETURNING *`;
      const values = [user_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async readUniqueCart(user_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *FROM cart WHERE user_id = $1`;
      const values = [user_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
}

class CartItemModel {
  static async checkIfItemExist(product_id, cart_id) {
    try {
      const statement = `SELECT COUNT(*) 
                      FROM cart_items ci
                      JOIN products p ON ci.product_id = p.id
                      WHERE ci.product_id = $1 AND ci.cart_id = $2 `;
      const values = [product_id, cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async incrementItemBy1(product_id, cart_id) {
    try {
      const statement = `UPDATE cart_items ci
                        SET quantity = quantity + 1
                        WHERE ci.product_id = $1
                        AND ci.cart_id = $2 `;
      const values = [product_id, cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async addItemToCart(cart_id, product_id) {
    try {
      const statement = `INSERT INTO cart_items (cart_id, product_id, quantity ) VALUES ($1, $2, DEFAULT) RETURNING *`;
      const values = [cart_id, product_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async loadCartItems(cart_id) {
    try {
      const statement = `SELECT ci.id, p.name, p.price, p.description, ci.quantity
                      FROM cart_items ci
                      JOIN products p ON ci.product_id = p.id
                      WHERE ci.cart_id = $1;`;
      const values = [cart_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async findUniqueItem(cart_item_id) {
    try {
      // Generate SQL statement
      const statement = `SELECT ci.id, p.name, p.price, p.description, ci.quantity
                      FROM cart_items ci
                      JOIN products p ON ci.product_id = p.id
                      WHERE ci.id = $1;`;
      const values = [cart_item_id];

      // Execute SQL statement
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async deleteUniqueItem(id) {
    try {
      const statement = `DELETE FROM cart_items WHERE id = $1;`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { CartModel, CartItemModel };
