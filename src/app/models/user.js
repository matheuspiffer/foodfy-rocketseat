const db = require("../config/db");
const { hash } = require("bcryptjs");
const crypto = require("crypto");

module.exports = {
  async create(data) {
    try {
      const query = `
            INSERT INTO users(
                name,
                email,
                password,
                is_admin
            ) VALUES ($1, $2, $3, $4)
            RETURNING ID, email`;
      ;
      const password = Math.random()*10
      const values = [
        data.name,
        data.email,
        password,
        data.is_admin ? data.is_admin : false,
      ];
      return await db.query(query, values);
      ;
    } catch (err) {
      console.error(err);
    }
  },
  async all() {
    try {
      const query = `
            SELECT id, name, email, is_admin FROM users`;
      return await db.query(query);
    } catch (err) {
      console.error(err);
    }
  },
  async findOne(filters) {
    try {
      let query = "SELECT * FROM users";
      Object.keys(filters).map((key) => {
        query = `${query}
                ${key}`;
        Object.keys(filters[key]).map((field) => {
          query = `${query} ${field} = '${filters[key][field]}'`;
        });
      });
      return await db.query(query);
    } catch (err) {
      console.error(err);
    }
  },
  async update(id, fields) {
    try {
      let query = `UPDATE users SET`;
      Object.keys(fields).map((key, index, array) => {
        if (index + 1 < array.length) {
          query = `${query}
              ${key} = '${fields[key]}',`;
        } else {
          query = `${query}
              ${key} = '${fields[key]}'
              WHERE id = ${id}`;
        }
      });
      await db.query(query);
      return;
    } catch (err) {
      console.error(err);
    }
  },
  async delete(id) {
    try {
      return;
    } catch (err) {
      console.error(err);
    }
  },
};
