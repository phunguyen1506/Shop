const express = require('express');
const router = express.Router()
const {orderController} = require('../controllers/index')
const orderDTO = require('../models/order')

router.get('/listOrders',orderController.listOrder)
router.post('/',orderController.newOrder)
router.put('/:id', orderController.updateStatus)


module.exports = router