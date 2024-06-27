const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/UserController');
const { checkIfAdminUserExists, createAdminUser } = require('../controllers/AdminController');

routes.post('/create/admin',
UserController.checkIfUserExists,
checkIfAdminUserExists,
UserController.createUser,
createAdminUser)

routes.post('/login',)

module.exports = routes;