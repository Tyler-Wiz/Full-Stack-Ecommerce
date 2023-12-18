const db = require("../../config/index");

class OAuthClass {
  static async create(id, name, email, provider) {
    try {
      const statement = `INSERT INTO Oauth_users (id, name, email, provider)
                         VALUES ($1, $2, $3, $4) RETURNING*`;
      const values = [id, name, email, provider];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async readById(id) {
    try {
      const statement = `SELECT * FROM Oauth_users WHERE id = $1`;
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
