const Recipe = require("../models/recipe");
const File = require("../models/file");
const { age, date, since } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render("admin/recipes/index", { items: recipes });
    });
  },
  async create(req, res) {
    try {
      const chefs = await Recipe.chefSelectOption();
      return res.render("admin/recipes/create", { chefs });
    } catch (err) {
      console.error(err);
    }
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body);
      keys.forEach((key) => {
        if (!req.body[key]) {
          return res.send("please fill the " + key + " field");
        }
      });
      if (req.files.length == 0) return res.send("Choose at least one image");

      const results = await Recipe.create(req.body);
      const recipeId = results.rows[0].id;
      const filesPromises = req.files.map((file) => {
        return File.create({ ...file });
      });
      const filesResults = await Promise.all(filesPromises);
      const recipeFiles = filesResults.map((file) => {
        const fileId = file.rows[0].id;
        File.createRelationBetweenRecipesAndFiles(recipeId, fileId);
      });
      await Promise.all(recipeFiles);

      return res.redirect("recipes/" + recipeId + "/edit");
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      let results = await Recipe.find(id);
      const recipe = results.rows[0]
      return res.render("admin/recipes/show", { item: recipe });
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const { id } = req.params;
      let results = await Recipe.find(id);
      const recipe = results.rows[0];
      results = await Recipe.chefSelectOption();
      const chefs = results.rows;
      results = await File.find(id);
      let files = results.rows;
      files = files.map((file) => ({
        ...file,
        address: `${req.protocol}://${req.headers.host}${file.path_file.replace(
          "public",
          ""
        )}`,
      }));
      return res.render("admin/recipes/edit", { item: recipe, chefs, files });
    } catch (err) {
      console.error(err);
    }
  },
  put(req, res) {
    Recipe.update(req.body, (id) => {
      return res.redirect("recipes/" + id);
    });
  },
  delete(req, res) {
    const { id } = req.body;
    Recipe.delete(id, () => {
      return res.redirect("recipes");
    });
  },
};
