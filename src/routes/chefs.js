const express = require('express')
const multer = require('../app/middlewares/multer')
const routes = express.Router()
const chefs = require('../app/controllers/chefs')



routes.get("/admin/chefs", chefs.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de uma receita
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de receita

routes.post("/admin/chefs", multer.array("photo", 1),chefs.post); // Cadastrar nova receita
routes.put("/admin/chefs", chefs.put); // Editar uma receita
routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita



module.exports = routes