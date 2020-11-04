const db = require("../config/db");
const { date } = require("../../lib/utils");
module.exports = {
  all() {
    try {
      const query = `
            SELECT chefs.*, files.path AS avatar
            FROM chefs
            LEFT JOIN files ON (chefs.file_id = files.id)
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
             user_id,  
             name,
             created_at,
             file_id
         ) VALUES ($1, $2, $3, $4)`;
      const values = [
        data.userId,
        data.name,
        date(Date.now()).iso,
        data.fileId,
      ];
      return db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  find(id) {
    const query = `
        SELECT chefs.*, 
        count(recipes) AS total_recipes,
        files.path AS avatar
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        LEFT JOIN files ON (chefs.file_id = files.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id, files.path`;
    return db.query(query, [id]);
  },
  chefSelectOption(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if (err) throw "Database error " + err;
      callback(results.rows);
    });
  },
  update(data) {
    const query = `
        UPDATE chefs SET
        name=($1)
        WHERE id = $2
        RETURNING ID`;
    const values = [data.name, data.id];
    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE FROM chefs WHERE id = $1`, [id]);
  },
};
