const express = require('express')
const routes = express.Router()
const Users = require('../app/controllers/users')

routes.get('/admin/users/create', Users.create)
routes.get('/admin/users/1', Users.show)

module.exports = routes