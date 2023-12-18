const db = require("../../config/index");

class OAuthClass {
  static async createFacebookUser(id, name) {
    try {
      const statement = `INSERT INTO facebook_users (id, name)
                         VALUES ($1, $2) RETURNING*`;
      const values = [id, name];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readFacebookUserById(id) {
    try {
      const statement = `SELECT * FROM facebook_users WHERE id = $1`;
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
}

module.exports = OAuthClass;
