const Recipe = require("../models/recipe");
const Chef = require("../models/chef");
module.exports = {
  async index(req, res) {
    try {
      const results = await Recipe.all();
      const recipes = results.rows;
      console.log(recipes)
      return res.render("./client/index", { items: recipes });
    } catch (err) {
      console.error(err);
    }
  },
  async recipes(req, res) {
    try {
      const results = await Recipe.all();
      const recipes = results.rows;
      return res.render("./client/recipes", { items: recipes });
    } catch (err) {
      console.error(err);
    }
  },

  async recipe(req, res) {
    try {
      const id = req.params.index;
      const results = await Recipe.find(id);
      const recipe = results.rows[0];
      res.render("./client/recipe", { item: recipe });
    } catch (err) {
      console.error(err);
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
      return res.render("./client/chefs", { chefs });
    } catch (err) {
      console.log(err);
    }
  },
};
