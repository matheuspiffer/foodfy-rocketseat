const Recipe = require("../models/recipe");
const File = require("../models/file");
const { age, date, since } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
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
      return res.render("admin/recipes/index", { items: recipes });
    } catch (err) {
      console.error(err);
    }
  },
  async create(req, res) {
    try {
      const results = await Recipe.chefSelectOption();
      const chefs = results.rows;
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
        return File.create({ ...file, recipeId });
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
      console.log(files);
      return res.render("admin/recipes/show", { item: recipe, files });
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
      results = await File.findByRecipe(id);
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
  async put(req, res) {
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
      if (!req.body[key] && key != "removed_files" && key != "photos") {
        res.send("Please fill " + key);
      }
    });
    if (req.files.length != 0) {
      const newFilesPromise = req.files.map((file) => {
        File.create({ ...file, productId: req.body.id });
      });
      await Promise.all(newFilesPromise);
    }
    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      console.log(removedFiles);
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);
      console.log(removedFiles);
      const removedFilesPromises = removedFiles.map((id) => {
        console.log(id);
        File.delete(id);
      });
      await Promise.all(removedFilesPromises);
    }
    const results = await Recipe.update(req.body);
    const id = results.rows[0].id;
    return res.redirect("recipes/" + id);
  },
  delete(req, res) {
    const { id } = req.body;
    Recipe.delete(id, () => {
      return res.redirect("recipes");
    });
  },
};
