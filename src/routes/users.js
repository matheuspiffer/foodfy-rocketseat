const express = require("express");
const routes = express.Router();
const Users = require("../app/controllers/users");
const Session = require("../app/controllers/session");
const sessionValidator = require("../app/validators/session");
const userValidator = require("../app/validators/user");
const { onlyAdmins } = require("../app/middlewares/session");

routes.get("/admin/users/create", onlyAdmins, Users.create);
routes.get("/admin/users/:id/edit", onlyAdmins, Users.show);
routes.post("/admin/users", onlyAdmins, userValidator.post, Users.post);
routes.get("/admin/users", onlyAdmins, Users.list); //Mostrar a lista de usuários cadastrados
routes.put("/admin/users", Users.update);
routes.delete("/admin/users", Users.delete);

//login/logout
routes.get("/admin/login", Session.loginForm);
routes.post("/admin/login", sessionValidator.login, Session.login);
routes.post("/admin/logout", Session.logout);

//session
routes.get("/admin/forgot-password", Session.forgotForm);
routes.post("/admin/forgot-password", sessionValidator.forgot, Session.forgot);
routes.get("/admin/new-password", Session.newPasswordForm);
routes.post("/admin/new-password", sessionValidator.reset, Session.reset);

// // Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado"

// // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/admin/users', UserController.list) //Mostrar a lista de usuários cadastrados
// routes.post('/admin/users', UserController.post) //Cadastrar um usuário
// routes.put('/admin/users', UserController.put) // Editar um usuário
// routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes;
