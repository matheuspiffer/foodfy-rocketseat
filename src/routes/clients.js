const express = require('express')
const multer = require('../app/middlewares/multer')
const routes = express.Router()

const clients = require('../app/controllers/clients')
const search = require('../app/controllers/search')


routes.get('/recipes/search', search.index)

routes.get('/', clients.index)
routes.get('/recipes', clients.recipes)
routes.get("/recipes/:index", clients.recipe)
routes.get('/chefs', clients.chefs)
routes.get('/about', clients.about)

module.exports = routes