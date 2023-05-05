const express = require('express');
const { Router } = require('express');
const { adminController } = require("../controllers");
const { validateCreate, validateEdit } = require('../validate/product')

const router = express.Router()

router.get('/listProduct', adminController.getAllProducts)
router.get('/testAggerate', adminController.testAggerate)
router.get('/sellProduct', adminController.sellProduct)
router.get('/search', adminController.searchProduct)

router.post('/addProduct',
    validateCreate(adminController.addProduct),
    adminController.addProduct)
router.put('/editProduct',
    validateEdit(adminController.editProduct),
    adminController.editProduct)
router.delete('/deleteProduct', adminController.deleteProduct)
// router.delete('/deleteOrder', adminController.testAggerate)


module.exports = router