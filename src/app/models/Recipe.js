const db = require("../config/db");
const { date } = require("../../lib/utils");
module.exports = {
  all() {
    try {
      const query = `
            SELECT recipes.*, 
            chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY created_at ASC
            `;
      return db.query(query);
    } catch (err) {
      console.error(err);
    }
  },
  create(data) {
    try {
      const query = `
            INSERT INTO recipes(
                chef_id,
                user_id,
                title,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING ID`;
      const values = [
        data.chef_id,
        data.userId,
        data.title,
        data.ingredients,
        data.preparation,
        data.information,
      ];
      return db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  find(id) {
    try {
      const query = `
          SELECT recipes.*, chefs.name AS author
          FROM recipes
          LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
          WHERE recipes.id = $1`;
      return db.query(query, [id]);
    } catch (err) {
      console.error(err);
    }
  },
  findByAuthor(id) {
    try {
      const query = `
          SELECT recipes.*
          FROM recipes
          WHERE recipes.chef_id = $1`;
      return db.query(query, [id]);
    } catch (err) {
      console.error(err);
    }
  },

  chefSelectOption() {
    return db.query(`SELECT name, id FROM chefs`);
  },
  update(data) {
    const query = `
        UPDATE recipes SET
        chef_id=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5)
        WHERE id = $6
        RETURNING ID`;
    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id,
    ];
    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id]);
  },

  search(filter) {
    try {
      console.log(filter);
      let query = `SELECT recipes.*, 
                  chefs.name AS chef_name
                  FROM recipes
                  LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
                  WHERE recipes.title ilike '%${filter}%'`;

      return db.query(query);
    } catch (err) {
      console.error(err);
    }
  },
};
