const express = require('express');

const routes = express.Router();

const tNodeController = require('../controller/transitNodeController')

//working ok - must check access
routes.post('/add',
    tNodeController.checkIfTransitNodeExistsByNameEn,
    tNodeController.generatePlaceId,
    tNodeController.checkIfTransitNodeExistsByPlaceId,
    tNodeController.createTransiteNode);

routes.put('/update/:place_id',
    tNodeController.updateTransitNode
)

routes.get('/get/all', tNodeController.getAllTransitNodes)

routes.get('/get/single/:place_id', tNodeController.getSingleTransitNode)

//warning! only for dev purposes
routes.delete('/delete/single/:place_id',
    tNodeController.deleteSingleTransitNode)

//warning! only for dev purposes
routes.delete('/delete/all',
    tNodeController.deleteAllTransitNodes)

module.exports = routes;