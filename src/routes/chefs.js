const express = require("express");
const multer = require("../app/middlewares/multer");
const routes = express.Router();
const chefs = require("../app/controllers/chefs");
const { onlyUsers, onlyAdmins } = require("../app/middlewares/session");

routes.get("/admin/chefs", onlyUsers, chefs.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", onlyAdmins, chefs.create); // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", onlyUsers, chefs.show); // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", onlyAdmins, chefs.edit); // Mostrar formulário de edição de chefs

routes.post("/admin/chefs", onlyAdmins, multer.array("photo", 1), chefs.post); // Cadastrar nova chefs
routes.put("/admin/chefs", onlyAdmins, multer.array("photo", 1), chefs.put); // Editar um chef
routes.delete("/admin/chefs", onlyAdmins, chefs.delete); // Deletar um chef

module.exports = routes;
