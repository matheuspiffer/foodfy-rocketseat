const express = require('express')
const routes = express.Router()
const clients = require('./clients')
const recipes = require('./recipes')
const chefs = require('./chefs')
const users = require('./users')

routes.use(clients)
routes.use(recipes)
routes.use(chefs)
routes.use(users)

module.exports = routes