const express = require('express');

const routes = express.Router();

const tNodeController = require('../controller/transitNodeController')

//working ok - must check access
routes.post('/add',
    tNodeController.checkIfTransitNodeExistsByNameEn,
    tNodeController.generatePlaceId,
    tNodeController.checkIfTransitNodeExistsByPlaceId,
    tNodeController.createTransiteNode);

module.exports = routes;