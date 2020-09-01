const Recipe = require("../models/recipe");
const File = require("../models/file");
const { age, date, since } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render("admin/recipes/index", { items: recipes });
    });
  },
  create(req, res) {
    Recipe.chefSelectOption((chefs) => {
      return res.render("admin/recipes/create", { chefs });
    });
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body);
      keys.forEach((key) => {
        if (!req.body[key]) {
          return res.send("please fill the " + " field");
        }
      });
      if (req.files.length == 0) return res.send("Choose at least one image");

      const results = await Recipe.create(req.body);
      const recipeId = results.rows[0].id;
      const filesPromises = req.files.map(async (file) => {
        await File.create({ ...file });
      });
      const filesResults = await Promise.all(filesPromises);
      console.log(filesResults);
      // const recipeFiles = files.map(file=>{
      //     const fileId = file.rows[0].id
      //     File.createRelationBetweenRecipesAndFiles(recipeId, fileId)
      // })

      // await Promise.all(recipeFiles)
      return res.redirect("recipes/");
    } catch (err) {
      console.error(err);
    }
  },
  show(req, res) {
    const { id } = req.params;
    Recipe.find(id, (recipe) => {
      return res.render("admin/recipes/show", { item: recipe });
    });
  },
  edit(req, res) {
    const { id } = req.params;
    Recipe.find(id, (recipe) => {
      Recipe.chefSelectOption((chefs) => {
        return res.render("admin/recipes/edit", { item: recipe, chefs });
      });
    });
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
