const User = require("../models/user");

module.exports = {
  async index(req, res) {
    try {
      const id = req.session.userId;
      const results = await User.findOne({ where: { id } });
      const user = results.rows[0];
      return res.render("./admin/users/profile", { user });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      const id = req.session.userId;
      const { name, email } = req.body;
      await User.update(id, { name, email });
      return res.render("./admin/users/profile", {
        user: req.body,
        success: "Seus dados foram atualizados!",
      });
    } catch (err) {
      console.error(err);
      return res.render("./admin/users/profile", {
        user: req.body,
        error: "Erro inesperado, tente novamente em alguns instantes.",
      });
    }
  },
};
