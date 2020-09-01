const db = require("../config/db");
const { date } = require("../../lib/utils");
module.exports = {
  all() {
    try {
      const query = `
            SELECT *
            FROM chefs
            `;
      return db.query(query);
    } catch (err) {
      console.error(err);
    }
  },
  create(data) {
    try {
      const query = `
         INSERT INTO chefs(
             name,
             created_at,
             file_id
         ) VALUES ($1, $2, $3)`;
      const values = [data.name, date(Date.now()).iso, data.fileId];
      return db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  find(id) {
    const query = `
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        LEFT JOIN files ON (chefs.file_id = files.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`;
    return db.query(query, [id])
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
