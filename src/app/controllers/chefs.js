const Chef = require("../models/chef");
const Recipe = require("../models/recipe");
const File = require("../models/file");
const { age, date, since } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const results = await Chef.all();
      const chefs = results.rows;
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
     results = await File.findByChef(results.rows[0].file_id)
     const avatar = results.rows[0].path
     chef = {
       ...chef,
       avatar: `${req.protocol}://${req.headers.host}${avatar.replace("public","")}`
     }
     console.log(chef)
    results = await Recipe.findByAuthor(id);
    const recipes = results.rows;
    return res.render("admin/chefs/show", { chef, recipes });
  },
  edit(req, res) {
    const { id } = req.params;
    Chef.find(id, (chef) => {
      return res.render("admin/chefs/edit", { chef });
    });
  },
  put(req, res) {
    console.log(req.body);
    Chef.update(req.body, (id) => {
      return res.redirect("chefs/" + id);
    });
  },
  delete(req, res) {
    const { id } = req.body;
    Chef.delete(id, () => {
      return res.redirect("chefs");
    });
  },
};
