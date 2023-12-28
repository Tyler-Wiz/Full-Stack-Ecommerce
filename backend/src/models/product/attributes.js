const db = require("../../../config/index");

class AttributeModel {
  static async create(name) {
    try {
      const statement = `INSERT INTO attributes (name) VALUES($1) RETURNING*`;
      const values = [name];
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
      const statement = `SELECT id, name FROM attributes`;
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
      const statement = `SELECT id, name FROM attributes WHERE id = $1`;
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
  static async update(name, id) {
    try {
      const statement = `UPDATE attributes SET name = $1 WHERE id = $2`;
      const values = [name, id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }

  // DELETE
  static async deleteAttr(id) {
    try {
      const statement = `DELETE FROM attributes WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

// Attribute Option Model ------------------------------------------
class AttributeOptionModel {
  static async create(attribute_id, value) {
    try {
      const statement = `INSERT INTO attributes_options (attribute_id, value) 
                         VALUES($1, $2) RETURNING *`;
      const values = [attribute_id, value];
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
      const statement = `SELECT ao.id, ao.attribute_id, ao.value, a.name
                         FROM attributes_options ao
                         INNER JOIN attributes a ON a.id = ao.attribute_id`;
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
      const statement = `SELECT id, attribute_id, value 
                         FROM attributes_options WHERE id = $1`;
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
      const statement = `UPDATE attributes_options SET value = $1, 
                        attribute_id = $2 WHERE id = $3`;
      const values = [data.value, data.attribute_id, data.id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }

  // DELETE
  static async deletedAttrOption(id) {
    try {
      const statement = `DELETE FROM attributes_options WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

// Product Attributes ------------------------------------------
class ProductAttributes {
  static async create(product_id, att_options_id) {
    try {
      const statement = `INSERT INTO product_attributes (product_id, att_options_id) 
                         VALUES($1, $2) RETURNING*`;
      const values = [product_id, att_options_id];
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
  static async readProductAttributes(product_id) {
    try {
      const statement = `SELECT ao.value, a.name, pa.id
                         FROM product_attributes pa
                         INNER JOIN attributes_options ao ON pa.att_options_id = ao.id
                         INNER JOIN attributes a ON a.id = ao.attribute_id
                         WHERE pa.product_id= $1`;
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

  // DELETE
  static async deleteUnique(id) {
    try {
      const statement = `DELETE FROM product_attributes WHERE id = $1`;
      const values = [id];
      await db.query(statement, values);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = {
  AttributeModel,
  AttributeOptionModel,
  ProductAttributes,
};
