const Recipe = require("../models/recipe");
const File = require('../models/file')

module.exports = {
  async index(req, res) {
    try {
      const { filter } = req.query;
      if (!filter) return res.redirect("/recipes");
      let results = await Recipe.search(filter);
      const itemsPromise = results.rows.map(async (recipe) => {
        const recipePath = await File.findByRecipe(recipe.id);
        const path = recipePath.rows[0].path_file;
        recipe.path = `${req.protocol}://${req.headers.host}${path.replace(
          "public",
          ""
        )}`;
        return recipe;
      });
      const items = await Promise.all(itemsPromise);
      const search = {
        term: req.query.filter,
      };

      return res.render("./client/search", { items, search });
    } catch (err) {
      console.error(err);
    }
  },
};
