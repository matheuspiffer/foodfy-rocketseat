const User = require("../models/User");
const mailer = require("../../lib/mailer");
const crypto = require("crypto");
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
      const results = await User.findOne({ where: { id } });
      const user = results.rows[0];
      return res.render("./admin/users/edit", { user });
    } catch (err) {
      console.error(err);
    }
  },
  async post(req, res) {
    try {
      const user = await User.create(req.body);
      const token = crypto.randomBytes(20).toString("hex");
      let now = new Date();
      now = now.setHours(now.getHours() + 1);
      await User.update(user.rows[0].id, {
        reset_token: token,
        reset_token_expires: now,
      });
      await mailer.sendMail({
        to: user.rows[0].email,
        from: "No-reply@foodfy.com.br",
        subject: "Bem-vindo ao Foodfy",
        html: `<h2>Bem-vindo</h2>
        <p>clique no link abaixo para criar sua senha e e contribuir com a mais deliciosas receitas</p>
        <p>
          <a href="https://localhost:3000/users/new-password?token=${token}" target="_blank">
            Cadastrar senha
          </a>
        </p>`,
      });

      return res.render("./admin/users/register", {
        success: "Usuário cadastrado com sucesso!",
      });
    } catch (err) {
      return res.render("./admin/users/register", {
        user: req.body,
        error: "Erro inesperado, por favor tente novamente",
      });
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
      await User.delete(id);
      let results = await User.all();
      const users = results.rows;
      return res.render("./admin/users/list", {
        users,
        success: "Usuário deletado com sucesso",
      });
    } catch (err) {
      console.error(err);
    }
  },
};
