const User = require("../models/user");
const crypto = require("crypto");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");
module.exports = {
  loginForm(req, res) {
    return res.render("admin/session/login");
  },
  newPasswordForm(req, res) {
    return res.render("admin/session/new-password", { token: req.query.token });
  },
  forgotForm(req, res) {
    return res.render("admin/session/forgot-password");
  },
  login(req, res) {
    req.session.userId = req.user.id;
    req.session.userAdmin = req.user.is_admin;
    console.log(req.session.userAdmin);
    return res.redirect("/admin");
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/");
  },
  async forgot(req, res) {
    try {
      const user = req.user;
      const token = crypto.randomBytes(20).toString("hex");
      let now = new Date();
      now = now.setHours(now.getHours() + 1);
      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });
      await mailer.sendMail({
        to: user.email,
        from: "No-reply@foodfy.com.br",
        subject: "Recuperação de senha Foodfy",
        html: `<h2>Bem-vindo</h2>
        <p>clique no link abaixo para redefinir sua senha e contribuir com a mais deliciosas receitas</p>
        <p>
          <a href="localhost:3000/admin/new-password?token=${token}" target="_blank">
            Redefenir senha
          </a>
        </p>`,
      });

      return res.render("./admin/session/login", {
        success: "Por favor verifique o seu email!",
      });
    } catch (err) {
      console.error(err);
      return res.render("./admin/session/forgot-password", {
        user: req.body,
        error: "Erro inesperado, por favor tente novamente",
      });
    }
  },
  async reset(req, res) {
    const { user } = req;
    const { password, token } = req.body;

    try {
      //cria um novo hash de senha
      const newPassword = await hash(password, 8);
      //atualiza o usuário

      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });
      //avisa o usuário senha foi alterada

      return res.render("admin/session/login", {
        user: req.body,
        success: "Senha atualizada, faça o login",
      });
    } catch (err) {
      console.error(err);
      return res.render("admin/session/new-password", {
        error: "Erro inesperado, tente novamente",
        token,
      });
    }
  },
};
