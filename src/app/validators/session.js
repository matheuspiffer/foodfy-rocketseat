const User = require("../models/user");
const { compare } = require("bcryptjs");

module.exports = {
  async login(req, res, next) {
    let { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.render("admin/session/login", {
        user: req.body,
        error: "usuário não encontrado",
      });
    // console.log(password, user.rows[0].password)
    const passed = await compare(password, user.rows[0].password);
    if (!passed) {
      return res.render("admin/session/login", {
        user: req.body,
        error: "Senha incorreta",
      });
    }
    req.user = {
      id: user.rows[0].id,
      is_admin: user.rows[0].is_admin,
    };
    next();
  },
  async forgot(req, res, next) {
    let { email } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!user.rows[0])
      return res.render("admin/session/forgot-password", {
        user: req.body,
        error: "Email não encontrado",
      });
    req.user = user.rows[0];
    next();
  },
  async reset(req, res, next) {
    //procurar usuário
    const { email, password, passwordRepeat, token } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.render("admin/session/new-password", {
        user: req.body,
        token,
        error: "usuário não encontrado",
      });
    //ver se a senha bate

    if (password != passwordRepeat) {
      return res.render("admin/session/new-password", {
        error: "As senhas não são iguais",
        token,
        user: req.body,
      });
    }
    //verificar se o token bate
    console.log(token, user.rows[0].reset_token);
    if (token != user.rows[0].reset_token)
      return res.render("admin/session/forgot-password", {
        user: req.body,
        token,
        error: "Token inválido, solicite uma nova recuperação de senha",
      });

    //verificar se o token nao expirou
    let now = new Date();
    now = now.setHours(now.getHours());
    if (now > user.rows[0].reset_token_expires)
      return res.render("admin/session/forgot-password", {
        user: req.body,
        token,
        error: "Token expirado, solicite uma nova recuperação de senha",
      });

    req.user = user.rows[0];
    next();
  },
};
