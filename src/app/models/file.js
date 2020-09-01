const db = require("../config/db");
const recipe = require("./recipe");

module.exports = {
  create({ filename, path }) {
    try {
      const query = `
            INSERT INTO files(
                name,
                path
                )VALUES ($1, $2)
                RETURNING id
                `;

      const values = [filename, path];

      return db.query(query, values);
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
  findByChef(id){
    const query = `
    SELECT files.*
    FROM files
    WHERE files.id = $1`
   return db.query(query, [id])
  }
};
