const express = require('express');

const routes = express.Router();

const tNodeController = require('../controller/transitNodeController')

routes.post('/add',
    tNodeController.generatePlaceId,
    tNodeController.checkIfTransitNodeExistsByPlaceId,
    tNodeController.createTransiteNode);

module.exports = routes;