const db = require("../config/db");
const recipe = require("./Recipe");
const fs = require("fs");

module.exports = {
  async create({ filename, path }) {
    try {
      const query = `
            INSERT INTO files(
                name,
                path
                )VALUES ($1, $2)
                RETURNING id
                `;

      const values = [filename, path];

      const results = await db.query(query, values);
      console.log(results.rows)
      return results;
    } catch (err) {
      console.error(err);
    }
  },
  createRelationBetweenRecipesAndFiles(recipeId, fileId) {
    try {
      const query = `
                INSERT INTO recipe_files(
                    recipe_id,
                    file_id
                    )VALUES ($1, $2)
                    `;
      const values = [recipeId, fileId];

      db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  findByRecipe(recipeId) {
    const query = `
    SELECT recipe_files.*, files.path AS path_file
    FROM recipe_files
    LEFT JOIN files ON (files.id = recipe_files.file_id)
    WHERE recipe_files.recipe_id = $1
    `;
    return db.query(query, [recipeId]);
  },
  findByChef(id) {
    const query = `
    SELECT files.*
    FROM files
    WHERE files.id = $1`;
    return db.query(query, [id]);
  },
  async delete(id) {
    try {
      // const results = await db.query(`SELECT * FROM files WHERE id =$1`, [id]);
      // const file = results.rows[0];
      // fs.unlinkSync(file.path);
      await db.query("DELETE FROM recipe_files WHERE file_id = $1", [id]);
      await db.query(`DELETE FROM files WHERE id = $1`, [id]);
      return;
    } catch (err) {
      console.error(err);
    }
  },
  async edit({ filename, path, id }) {
    const query = `
    UPDATE files SET
    name=($1),
    path=($2)
    WHERE id = $3
    RETURNING ID`;
    const values = [filename, path, id];
    console.log(values);
    return db.query(query, values);
  },
};
