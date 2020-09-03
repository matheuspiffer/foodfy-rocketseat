const Recipe = require("../models/recipe");
const Chef = require("../models/chef");
module.exports = {
  async index(req, res) {
    try {
      const results = await Recipe.all();
      const recipes = results.rows;
      return res.render("./client/index", { items: recipes });
    } catch (err) {
      console.error(err);
    }
  },
  recipes(req, res) {
    Recipe.all((recipes) => {
      return res.render("./client/recipes", { items: recipes });
    });
  },

  recipe(req, res) {
    const id = req.params.index;
    Recipe.find(id, (recipe) => {
      res.render("./client/recipe", { item: recipe });
    });
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
