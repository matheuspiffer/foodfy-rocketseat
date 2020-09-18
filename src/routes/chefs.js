const express = require('express')
const multer = require('../app/middlewares/multer')
const routes = express.Router()
const chefs = require('../app/controllers/chefs')



routes.get("/admin/chefs", chefs.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de chefs

routes.post("/admin/chefs", multer.array("photo", 1),chefs.post); // Cadastrar nova chefs
routes.put("/admin/chefs", chefs.put); // Editar um chef
routes.delete("/admin/chefs", chefs.delete); // Deletar um chef



module.exports = routes