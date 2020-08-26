const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')
const clients = require('./app/controllers/clients')
const chefs = require('./app/controllers/chefs')
const search = require('./app/controllers/search')

routes.get('/recipes/search', search.index)

routes.get('/', clients.index)
routes.get('/recipes', clients.recipes)
routes.get("/recipes/:index", clients.recipe)
routes.get('/chefs', clients.chefs)
routes.get('/about', clients.about)

//SEARCH


//admin area
//recipes
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.get("/admin", (req, res)=>{
    return res.redirect('/admin/chefs')
})
routes.get("/admin/chefs", chefs.index); // Mostrar a lista de receitas
// // chefs
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de uma receita
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de receita

routes.post("/admin/chefs", chefs.post); // Cadastrar nova receita
routes.put("/admin/chefs", chefs.put); // Editar uma receita
routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita



module.exports = routes