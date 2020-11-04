const express = require('express')
const multer = require('../app/middlewares/multer')
const routes = express.Router()

const ClientsController = require('../app/controllers/ClientsController')
const SearchController = require('../app/controllers/SearchController')


routes.get('/recipes/search', SearchController.index)

routes.get('/', ClientsController.index)
routes.get('/recipes', ClientsController.recipes)
routes.get("/recipes/:index", ClientsController.recipe)
routes.get('/chefs', ClientsController.chefs)
routes.get('/about', ClientsController.about)

module.exports = routes