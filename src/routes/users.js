const express = require("express");
const routes = express.Router();
const UsersController = require("../app/controllers/UsersController");
const SessionController = require("../app/controllers/SessionController");
const ProfileController = require("../app/controllers/ProfileController");
const sessionValidator = require("../app/validators/session");
const userValidator = require("../app/validators/user");
const { onlyAdmins, redirectToProfile } = require("../app/middlewares/session");

routes.get("/admin/profile", ProfileController.index); // Mostrar o formulário com dados do usuário logado
routes.put("/admin/profile", userValidator.update, ProfileController.put); // Editar o usuário logado

routes.get("/admin/users/create", onlyAdmins, UsersController.create);
routes.get("/admin/users/:id/edit", onlyAdmins, UsersController.show);
routes.post(
  "/admin/users",
  onlyAdmins,
  userValidator.post,
  UsersController.post
);
routes.get("/admin/users", redirectToProfile, onlyAdmins, UsersController.list); //Mostrar a lista de usuários cadastrados
routes.put("/admin/users", onlyAdmins, UsersController.update);
routes.delete(
  "/admin/users",
  onlyAdmins,
  userValidator.ownAccount,
  UsersController.delete
);

//login/logout
routes.get("/admin/login", SessionController.loginForm);
routes.post("/admin/login", sessionValidator.login, SessionController.login);
routes.post("/admin/logout", SessionController.logout);

//session
routes.get("/admin/forgot-password", SessionController.forgotForm);
routes.post(
  "/admin/forgot-password",
  sessionValidator.forgot,
  SessionController.forgot
);
routes.get("/admin/new-password", SessionController.newPasswordForm);
routes.post(
  "/admin/new-password",
  sessionValidator.reset,
  SessionController.reset
);

// // Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado"

// // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/admin/users', UserController.list) //Mostrar a lista de usuários cadastrados
// routes.post('/admin/users', UserController.post) //Cadastrar um usuário
// routes.put('/admin/users', UserController.put) // Editar um usuário
// routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes;
