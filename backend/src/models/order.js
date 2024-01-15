const db = require("../../config/index");

class orderModel {
  static async create(order_items, user_id) {
    try {
      const statement = `INSERT INTO orders(order_items, user_id) VALUES($1, $2) RETURNING*`;
      const values = [order_items, user_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async findOrderByUser(user_id) {
    try {
      const statement = `SELECT * FROM orders WHERE orders.user_id =  $1`;
      const values = [user_id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async findOrderById(id) {
    try {
      const statement = `SELECT * FROM orders WHERE id =  $1`;
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
  static async deleteOrder(id) {
    try {
      const statement = `DELETE FROM orders 
                         WHERE id =  $1`;
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

  static async deleteOrderQuery(order_id) {
    try {
      const statement = `INSERT INTO deleted_orders (order_id) VALUES ($1)`;
      const values = [order_id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = orderModel;
