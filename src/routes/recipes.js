const express = require("express");
const multer = require("../app/middlewares/multer");
const routes = express.Router();
const recipes = require("../app/controllers/recipes");
const { onlyUsers } = require("../app/middlewares/session");
const userValidator = require("../app/validators/user");

routes.get("/admin/recipes", onlyUsers, recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", onlyUsers, recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", onlyUsers, recipes.show); // Exibir detalhes de uma receita
routes.get(
  "/admin/recipes/:id/edit",
  userValidator.userRecipe,
  onlyUsers,
  recipes.edit
); // Mostrar formulário de edição de receita
routes.post(
  "/admin/recipes",
  onlyUsers,
  multer.array("photos", 5),
  recipes.post
); // Cadastrar nova receita
routes.put(
  "/admin/recipes",
  onlyUsers,
  multer.array("photos", 5),
  recipes.put
); // Editar uma receita
routes.delete(
  "/admin/recipes",
  onlyUsers,
  userValidator.userRecipe,
  recipes.delete
); // Deletar uma receita

routes.get("/admin", (req, res) => {
  return res.redirect("/admin/chefs");
});

module.exports = routes;
