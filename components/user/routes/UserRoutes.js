const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/UserController')

routes.post('/create/admin',UserController.createUser)

module.exports = routes;