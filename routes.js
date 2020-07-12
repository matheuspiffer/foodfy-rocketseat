const express = require('express')
const routes = express.Router()
const data = require('./data.json')
const admin = require('./admin')

routes.get('/', (req, res) => {
    res.render('./client/index', { items: data })
})
routes.get('/recipes', (req, res) => {
    res.render('./client/recipes', { items: data })
})
routes.get("/recipes/:index", function (req, res) {
    const ingredients = [...data];
    const recipeIndex = req.params.index;
    res.render('./client/recipe', { item: ingredients[recipeIndex] })
})
routes.get('/about', (req, res) => {
    res.render('./client/about')
})
//admin area

routes.get("/admin/recipes", admin.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", admin.create); // Mostrar formulário de nova receita
// routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

// routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
module.exports = routes