const express = require("express");
const multer = require("../app/middlewares/multer");
const routes = express.Router();
const ChefsController = require("../app/controllers/ChefsController");
const { onlyUsers, onlyAdmins } = require("../app/middlewares/session");

routes.get("/admin/chefs", onlyUsers, ChefsController.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", onlyAdmins, ChefsController.create); // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", onlyUsers, ChefsController.show); // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", onlyAdmins, ChefsController.edit); // Mostrar formulário de edição de chefs

routes.post("/admin/chefs", onlyAdmins, multer.array("photo", 1), ChefsController.post); // Cadastrar nova chefs
routes.put("/admin/chefs", onlyAdmins, multer.array("photo", 1), ChefsController.put); // Editar um chef
routes.delete("/admin/chefs", onlyAdmins, ChefsController.delete); // Deletar um chef

module.exports = routes;
