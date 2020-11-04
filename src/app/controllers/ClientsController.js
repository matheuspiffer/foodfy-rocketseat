const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");
const File = require("../models/File");

module.exports = {
  async index(req, res) {
    try {
      const results = await Recipe.all();
      if (!results) {
        return res.render("./client/index", {
          error: "No momento não há receitas cadastradas",
        });
      }
      const recipesPromise = results.rows.map(async (recipe) => {
        const recipePath = await File.findByRecipe(recipe.id);
        console.log(recipePath.rows);
        const path = recipePath
          ? `${req.protocol}://${
              req.headers.host
            }${recipePath.rows[0].path_file.replace("public", "")}`
          : null;
        recipe.path = path;
        return recipe;
      });
      const recipes = await Promise.all(recipesPromise);
      return res.render("./client/index", { items: recipes });
    } catch (err) {
      console.error(err);
    }
  },
  async recipes(req, res) {
    try {
      const results = await Recipe.all();
      const recipesPromise = results.rows.map(async (recipe) => {
        const recipePath = await File.findByRecipe(recipe.id);
        const path = recipePath.rows[0].path_file;
        recipe.path = `${req.protocol}://${req.headers.host}${path.replace(
          "public",
          ""
        )}`;
        return recipe;
      });
      const recipes = await Promise.all(recipesPromise);

      return res.render("./client/recipes", { items: recipes });
    } catch (err) {
      console.error(err);
    }
  },
  async recipe(req, res) {
    try {
      const id = req.params.index;
      let results = await Recipe.find(id);
      const recipe = results.rows[0];
      results = await File.findByRecipe(id);
      const files = results.rows.map((file) => {
        return {
          ...file,
          path_file: `${req.protocol}://${
            req.headers.host
          }${file.path_file.replace("public", "")}`,
        };
      });
      return res.render("./client/recipe", { item: recipe, files });
    } catch (err) {
      console.error(err);
      return res.redirect("/");
    }
  },
  about(req, res) {
    res.render("./client/about");
  },
  async chefs(req, res) {
    try {
      let results = await Chef.all();
      const chefs = results.rows.map((chef) => {
        return {
          ...chef,
          avatar: `${req.protocol}://${req.headers.host}${chef.avatar.replace(
            "public",
            ""
          )}`,
        };
      });
      console.log(chefs)
      return res.render("./client/chefs", { chefs });
    } catch (err) {
      console.log(err);
    }
  },
};
