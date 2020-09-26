module.exports = {
  loginForm(req, res) {
    return res.render("admin/session/login");
  },
  forgotForm(req, res) {
    return res.render("admin/session/forgot-password");
  },
  login(req, res) {
    req.session.userId = req.user.id;
    req.session.userAdmin = req.user.is_admin;
    console.log(req.session.userId)
    return res.redirect("/admin");
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

      return res.render("session/login", {
        user: req.body,
        success: "Senha atualizada, faça o login",
      });
    } catch (err) {
      console.error(err);
      return res.render("session/password-reset", {
        error: "Erro inesperado, tente novamente",
        token,
      });
    }
  },
};
