const User = require("../models/user");
const { compare } = require("bcryptjs");
module.exports = {
  async post(req, res, next) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user.rows[0]) {
      return res.render("./admin/users/register", {
        user: req.body,
        error: "Email já cadastrado",
      });
    }
    next();
  },
  async update(req, res, next) {
    let { password } = req.body;
    const id = req.session.userId;
    const user = await User.findOne({ where: { id } });

    if (!user)
      return res.render("admin/users/profile", {
        user: req.body,
        error: "Usuário não encontrado",
      });
    // console.log(password, user.rows[0].password)
    const passed = await compare(password, user.rows[0].password);
    if (!passed) {
      return res.render("admin/users/profile", {
        user: req.body,
        error: "Senha incorreta",
      });
    }
    next();
  },
};
