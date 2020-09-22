const db = require("../config/db");
const { hash } = require("bcryptjs");
const crypto = require("crypto");
const { update } = require("../controllers/users");

module.exports = {
  async create(data) {
    try {
      const query = `
            INSERT INTO users(
                name,
                email,
                password,
                is_admin
            ) VALUES ($1, $2, $3, $4)`;
      const password = crypto.randomBytes(10).toString("hex");
      const values = [
        data.name,
        data.email,
        password,
        data.is_admin ? data.is_admin : false,
      ];
      await db.query(query, values);
      return;
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
  async find(id) {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      return await db.query(query, [id]);
    } catch (err) {
      console.error(err);
    }
  },
  async update(id, fields) {
    try {
      let query = `UPDATE users SET`;
      Object.keys(fields).map((key, index, array) =>{
          if(index + 1 < array.length){
              query = `${query}
              ${key} = '${fields[key]}',`
          } else {
              query = `${query}
              ${key} = '${fields[key]}'
              WHERE id = ${id}`
          }
      })
      await db.query(query);
      return;
    } catch (err) {
      console.error(err);
    }
  },
  async delete(id){
      try{
        return
      }
      catch(err){
          console.error(err)
      }
  }
};
