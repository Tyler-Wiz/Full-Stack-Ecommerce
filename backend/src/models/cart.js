const db = require("../../config/index");

class CartModel {
  static async create(user_id) {
    const status = "pending";
    try {
      const statement = `INSERT INTO cart (user_id, status) VALUES ($1, $2) RETURNING *`;
      const values = [user_id, status];
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
      const statement = `SELECT * FROM cart WHERE user_id = $1`;
      const values = [user_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  static async deleteCartItems(id) {
    try {
      const statement = `DELETE FROM cart_items ci WHERE ci.cart_id = $1;`;
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
  static async updateCartStatus(id) {
    try {
      const statement = `UPDATE cart SET status = 'completed' WHERE id = $1 RETURNING *`;
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
}

// CartItems Model
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
                        SET cartQuantity = cartQuantity + 1
                        WHERE ci.product_id = $1
                        AND ci.cart_id = $2 RETURNING *`;
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

  static async cartQuantity(product_id, cart_id) {
    try {
      const statement = `SELECT ci.cartQuantity
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

  static async decrementItemBy1(product_id, cart_id) {
    try {
      const statement = `UPDATE cart_items ci
                        SET cartQuantity = cartQuantity - 1
                        WHERE ci.product_id = $1
                        AND ci.cart_id = $2 RETURNING *`;
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

  static async addItemToCart(
    cart_id,
    product_id,
    selected_size,
    selected_color
  ) {
    try {
      const statement = `INSERT INTO cart_items 
                        (cart_id, product_id, selected_size, selected_color, cartQuantity) 
                         VALUES ($1, $2, $3, $4, DEFAULT) RETURNING *`;
      const values = [cart_id, product_id, selected_size, selected_color];
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
      const statement = `SELECT ci.id as cart_item_id, p.id, p.category, 
                      p.discount, p.slug, p.images, ci.selected_size,
                       p.name, p.price, p.description, ci.cartQuantity 
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
      const statement = `SELECT ci.id, p.name, p.id as product_id, p.price, p.description, ci.cartQuantity
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
