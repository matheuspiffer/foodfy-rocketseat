const User = require("../models/user");

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.session;
      const results = await User.findOne({ where: { id } });
      const user = results.rows[0];
      return res.render("./admin/profile", { user });
    } catch (err) {
      console.error(err);
    }
  },
};
