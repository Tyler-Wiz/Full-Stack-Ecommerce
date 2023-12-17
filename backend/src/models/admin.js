const db = require("../../config/index");

class AdminModel {
  static async create(username, password, email, isAdmin) {
    try {
      const statement = `INSERT INTO admin_user (username, password,email, isAdmin) VALUES($1, $2, $3, $4) RETURNING*`;
      const values = [username, password, email, isAdmin];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readByUsername(username) {
    try {
      const statement = `SELECT * FROM admin_user WHERE username = $1`;
      const values = [username];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readById(id) {
    try {
      const statement = `SELECT * FROM admin_user WHERE id = $1`;
      const values = [id];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  static async update(data) {
    try {
      const statement = `UPDATE admin_user SET first_name = $1, last_name = $2 
                           WHERE id = $3`;
      const values = [data.id, data.first_name, data.last_name];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async updatePassword(id, password) {
    try {
      const statement = `UPDATE admin_user SET password = $2 WHERE id = $1`;
      const values = [id, password];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async updateLastLogin(id) {
    try {
      const statement = `UPDATE admin_user SET last_login = CURRENT_DATE WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async delete(id) {
    try {
      const statement = `DELETE FROM admin_user WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async createToken(admin_id, token_value) {
    const expirationTimestamp = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour
    try {
      const statement = `INSERT INTO admin_token (admin_id, token_value, expire) 
                            VALUES($1, $2, $3) RETURNING*`;
      const values = [admin_id, token_value, expirationTimestamp];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readToken(token_value) {
    try {
      const now = new Date();
      const statement = `SELECT * FROM admin_token WHERE token_value = $1 AND expire > $2`;
      const values = [token_value, now];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async deleteToken(admin_id) {
    try {
      const now = new Date();
      const statement = `DELETE FROM admin_token WHERE admin_id = $1 AND expire < $2`;
      const values = [admin_id, now];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AdminModel;
