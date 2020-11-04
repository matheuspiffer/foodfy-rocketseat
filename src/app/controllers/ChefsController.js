const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");
const { age, date, since } = require("../../lib/utils");
const fs = require("fs");
module.exports = {
  async index(req, res) {
    try {
      const results = await Chef.all();
      console.log(results.rows);
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
        if (!req.body[key] && req.body[key] == "file_id") {
          return res.send("please fill the " + key + " field");
        }
      });
      if (!req.files) return res.send("Please, select an avatar");
      const filesPromises = req.files.map((file) => {
        return File.create({ ...file });
      });

      const filesResults = await Promise.all(filesPromises);
      const fileId = filesResults[0].rows[0].id;
      const userId = req.session.userId;
      const data = {
        ...req.body,
        fileId,
        userId,
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

    return res.render("admin/chefs/show", { chef, recipes });
  },
  async edit(req, res) {
    const { id } = req.params;
    const results = await Chef.find(id);
    const chef = results.rows[0];
    return res.render("admin/chefs/edit", { chef });
  },
  async put(req, res) {
    try {
      let results = await Chef.find(req.body.id);
      const { file_id, avatar } = results.rows[0];
      if (req.files) {
        try {
          fs.unlinkSync(avatar);
          const filesPromises = req.files.map((file) => {
            return File.edit({ ...file, id: file_id });
          });
          await Promise.all(filesPromises);
        } catch (err) {
          console.error(err);
        }
      }
      results = await Chef.update(req.body);
      const id = results.rows[0].id;
      return res.redirect("chefs/" + id);
    } catch (err) {
      console.error(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      const chef = await Chef.find(id);
      try {
        fs.unlinkSync(chef.rows[0].avatar);
      } catch (error) {
        console.error(error);
      }

      await Chef.delete(id);
      return res.redirect("chefs");
    } catch (err) {
      console.error(err);
    }
  },
};
