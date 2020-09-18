const User = require("../models/user");
module.exports = {
  create(req, res) {
    try {
      return res.render("./admin/users/register");
    } catch (err) {
      console.error(err);
    }
  },
  show(req, res) {
    try {
      return res.render("./admin/users/edit");
    } catch (err) {
      console.error(err);
    }
  },
  async post(req, res) {
    try {
      await User.create(req.body);
      return res.redirect("/admin/users");
    } catch (err) {
      console.error(err);
    }
  },
  async list(req, res) {
    try {
      let results = await User.all();
      const users = results.rows;
      return res.render("./admin/users/list", { users });
    } catch (err) {
      console.error(err);
    }
  },
};
