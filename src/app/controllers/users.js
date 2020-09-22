const User = require("../models/user");
module.exports = {
  create(req, res) {
    try {
      return res.render("./admin/users/register");
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const results = await User.find(id);
      const user = results.rows[0];
      console.log(user);
      return res.render("./admin/users/edit", { user });
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
  async update(req, res) {
    try {
      let { name, email, is_admin, id } = req.body;
      is_admin = is_admin ? true : false;
      await User.update(id, { name, email, is_admin });

      return res.redirect("/admin/users");
    } catch (err) {
      console.error(err);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;
      await User.delete(id)
    } catch (err) {
      console.error(err);
    }
  },
};
