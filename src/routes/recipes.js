const express = require("express");
const multer = require("../app/middlewares/multer");
const routes = express.Router();
const RecipesController = require("../app/controllers/RecipesController");
const { onlyUsers } = require("../app/middlewares/session");
const userValidator = require("../app/validators/user");

routes.get("/admin/recipes", onlyUsers, RecipesController.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", onlyUsers, RecipesController.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", onlyUsers, RecipesController.show); // Exibir detalhes de uma receita
routes.get(
  "/admin/recipes/:id/edit",
  userValidator.userRecipe,
  onlyUsers,
  RecipesController.edit
); // Mostrar formulário de edição de receita
routes.post(
  "/admin/recipes",
  onlyUsers,
  multer.array("photos", 5),
  RecipesController.post
); // Cadastrar nova receita
routes.put(
  "/admin/recipes",
  onlyUsers,
  multer.array("photos", 5),
  RecipesController.put
); // Editar uma receita
routes.delete(
  "/admin/recipes",
  onlyUsers,
  userValidator.userRecipe,
  RecipesController.delete
); // Deletar uma receita

routes.get("/admin", (req, res) => {
  return res.redirect("/admin/chefs");
});

module.exports = routes;
