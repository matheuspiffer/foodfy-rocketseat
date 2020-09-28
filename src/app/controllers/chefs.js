const Chef = require("../models/chef");
const Recipe = require("../models/recipe");
const File = require("../models/file");
const { age, date, since } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const results = await Chef.all();
      let chefs = results.rows.map((chef) => {
        return {
          ...chef,
          avatar: chef.avatar
            ? `${req.protocol}://${req.headers.host}${chef.avatar.replace(
                "public",
                ""
              )}`
            : "",
        };
      });

      return res.render("admin/chefs/index", { chefs });
    } catch (err) {
      console.error(err);
    }
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body);
      keys.forEach((key) => {
        if (!req.body[key]) {
          return res.send("please fill the " + key + " field");
        }
      });
      if (!req.files) return res.send("Please, select an avatar");
      const filesPromises = req.files.map((file) => {
        return File.create({ ...file });
      });

      const filesResults = await Promise.all(filesPromises);
      const fileId = filesResults[0].rows[0].id;

      const data = {
        ...req.body,
        fileId,
      };
      await Chef.create(data);

      return res.redirect("/admin/chefs");
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    const { id } = req.params;
    let results = await Chef.find(id);
    let chef = results.rows[0];
    chef = {
      ...chef,
      avatar: chef.avatar
        ? `${req.protocol}://${req.headers.host}${chef.avatar.replace(
            "public",
            ""
          )}`
        : "",
    };
    results = await Recipe.findByAuthor(id);
    const recipesPromise = results.rows.map(async recipe=>{
      const recipePath = await File.findByRecipe(recipe.id);
        const path = recipePath.rows[0].path_file;
        recipe.path = `${req.protocol}://${req.headers.host}${path.replace(
          "public",
          ""
        )}`;
        return recipe;
    });
    const recipes = await Promise.all(recipesPromise)
  
    return res.render("admin/chefs/show", { chef, recipes });
  },
  async edit(req, res) {
    const { id } = req.params;
    const results = await Chef.find(id);
    const chef = results.rows[0]
    return res.render("admin/chefs/edit", { chef });
  },
  async put(req, res) {
    const results = await Chef.update(req.body)
    const id = results.rows[0].id
      return res.redirect("chefs/" + id);

  },
  delete(req, res) {
    const { id } = req.body;
    Chef.delete(id, () => {
      return res.redirect("chefs");
    });
  },
};
