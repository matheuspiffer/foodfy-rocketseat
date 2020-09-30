const User = require("../models/user");
const Recipe = require("../models/recipe");
const File = require("../models/file");
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
  async userRecipe(req, res, next) {
    try {
      const recipeId = req.params.id ? req.params.id : req.body.id;
      let results = await Recipe.find(recipeId);
      const recipe = results.rows[0];
      const recipeUserId = recipe ? recipe.user_id
        : req.body.recipe_user_id;
      let sessionUserId = req.session.userId;
      results = await File.findByRecipe(recipeId);
      const files = results.rows.map((file) => {
        return {
          ...file,
          path_file: `${req.protocol}://${
            req.headers.host
          }${file.path_file.replace("public", "")}`,
        };
      });
      if (sessionUserId != recipeUserId) {
        return res.render("admin/recipes/show", {
          item: recipe,
          files,
          error: "Você não pode editar receitas de outros usuários",
        });
      }
      next();
    } catch (err) {
      console.error(err);
    }
  },
  async ownAccount(req, res, next){
    const sessionId = req.session.userId
    const userId = req.body.id
    if(sessionId == userId){
      let results = await User.all();
      const users = results.rows;
      return res.render("./admin/users/list", {
        users,
        error: "Você não pode deletar sua própria conta",
      });
    }
    next()
  }
};
