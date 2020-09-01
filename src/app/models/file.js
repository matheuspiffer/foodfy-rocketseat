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
                `

      const values = [filename, path];

      return  db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  async createRelationBetweenRecipesAndFiles(recipeId, fileId) {
    try {
      const query = `
                INSER INTO recipe_files(
                    recipe_id,
                    file_id
                    )VALUES ($1, $2)
                    `;
      const values = [recipeId, fileId];

       return await db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
};
