const User = require("../models/user");
const { compare } = require("bcryptjs");

module.exports = {
  async login(req, res, next) {
    let { email, password } = req.body;
    let user = await User.findOne({ where: { email } });

    if (!user)
      return res.render("admin/session/login", {
        user: req.body,
        error: "usuário não encontrado",
      });
    //const passed = await compare(password, user.rows[0].password)
    if ((password =! user.rows[0].password)) {
      return res.render("admin/session/login", {
        user: req.body,
        error: "Senha incorreta",
      });
    }
    req.user = user.rows[0];
    next();
  },
  async reset(req, res, next) {
    //procurar usuário
    const { email, password, passwordRepeat, token } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "usuário não encontrado",
      });
    //ver se a senha bate

    if (password != passwordRepeat) {
      return res.render("session/password-reset", {
        error: "As senhas não são iguais",
        token,
        user: req.body,
      });
    }
    //verificar se o token bate
    if (token != user.reset_token)
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Token inválido, solicite uma nova recuperação de senha",
      });

    //verificar se o token nao expirou
    let now = new Date();
    now = now.setHours(now.getHours());
    if (now > user.reset_token_expires)
      return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Token expirado, solicite uma nova recuperação de senha",
      });

    req.user = user;
    next();
  },
};
