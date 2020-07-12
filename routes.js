const express = require('express')
const routes = express.Router()
const data = require('./data.json')
const admin = require('./admin')

routes.get('/', (req, res) => {
    res.render('./client/index', { items: data.recipes })
})
routes.get('/recipes', (req, res) => {
    res.render('./client/recipes', { items: data.recipes })
})
routes.get("/recipes/:index", function (req, res) {
    const ingredients = [...data.recipes];
    const recipeIndex = req.params.index;
    res.render('./client/recipe', { item: ingredients[recipeIndex] })
})
routes.get('/about', (req, res) => {
    res.render('./client/about')
})
//admin area

routes.get("/admin/recipes", admin.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", admin.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", admin.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", admin.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", admin.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
module.exports = routes