const db = require("../../config/index");

class UserModel {
  static async create(username, password, email, is_admin) {
    try {
      const statement = `INSERT INTO users (username, password,email, is_admin)
                         VALUES ($1, $2, $3, $4) RETURNING*`;
      const values = [username, password, email, is_admin];
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
      const statement = `SELECT * FROM users WHERE username = $1`;
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
      const statement = `SELECT * FROM users WHERE id = $1`;
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
      const statement = `UPDATE users SET first_name = $1, last_name = $2 
                           WHERE id = $3`;
      const values = [data.id, data.first_name, data.last_name];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async updatePassword(id, password) {
    try {
      const statement = `UPDATE users SET password = $2 WHERE id = $1`;
      const values = [id, password];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async updateLastLogin(id) {
    try {
      const statement = `UPDATE users SET last_login = CURRENT_DATE 
                         WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async delete(id) {
    try {
      const statement = `DELETE FROM users WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
  static async createToken(user_id, token_value) {
    const expirationTimestamp = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour
    try {
      const statement = `INSERT INTO user_token (user_id, token_value, expire) 
                         VALUES($1, $2, $3) RETURNING*`;
      const values = [user_id, token_value, expirationTimestamp];
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
      const statement = `SELECT * FROM user_token WHERE token_value = $1 AND expire > $2`;
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
  static async deleteToken(id) {
    try {
      const now = new Date();
      const statement = `DELETE FROM user_token WHERE id = $1 AND expire < $2`;
      const values = [id, now];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserModel;
