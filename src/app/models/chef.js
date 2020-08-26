const db = require("../config/db");
const { date } = require("../../lib/utils");
module.exports = {
  async all() {
    try {
      const query = `
            SELECT *
            FROM chefs
            `;
      const results = await db.query(query);
      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
  create(data, callback) {
    const query = `
        INSERT INTO chefs(
            name,
            avatar_url,
            created_at
        ) VALUES ($1, $2, $3)`;
    const values = [data.name, data.avatar_url, date(Date.now()).iso];
    db.query(query, values, (err, results) => {
      if (err) throw "Database error " + err;
      callback();
    });
  },
  find(id, callback) {
    const query = `
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`;
    db.query(query, [id], (err, results) => {
      if (err) throw "Database error " + err;
      callback(results.rows[0]);
    });
  },

  chefSelectOption(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if (err) throw "Database error " + err;
      callback(results.rows);
    });
  },
  update(data, callback) {
    const query = `
        UPDATE chefs SET
        name=($1),
        avatar_url=($2)
        WHERE id = $3
        RETURNING ID`;
    const values = [data.name, data.avatar_url, data.id];
    db.query(query, values, (err, results) => {
      if (err) throw "Database error " + err;
      callback(results.rows[0].id);
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results) => {
      if (err) throw "Database error " + err;
      callback();
    });
  },
};
