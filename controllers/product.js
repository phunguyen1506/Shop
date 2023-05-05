const { ulid } = require('ulid')
const adminHandler = require('../handler/products')
module.exports = {
    getAllProducts: async (req, res) => {
        const { productCode, productName, productType, price, quantity, category } = req.query
        const data = { productCode, productName, productType, price, quantity, category }
        const output = await adminHandler.getAllProducts(data)
        console.log(output)
        res.json(output)
    },
    addProduct: async (req, res) => {
        const { productCode, productName, productType, price, quantity, category } = req.body
        if (productCode === "") throw INVALID_REQUEST
        if (productName === "") throw INVALID_REQUEST
        const data = { productCode, productName, productType, price, quantity, category }
        await adminHandler.addProduct(data)
        res.json(data)
    },
    editProduct: async (req, res) => {
        const { productCode, productName, productType, price, quantity, category } = req.query // get luon luon dung query
        const data = { productCode, productName, productType, price, quantity, category }
        await adminHandler.editproduct(data)
        console.log(data)
        res.send('updated')
    },
    deleteProduct: async (req, res) => {
        const { productCode, productName, productType, price, quantity, category } = req.query // get luon luon dung query
        const data = { productCode, productName, productType, price, quantity, category }
        await adminHandler.deleteproduct(data)
        res.send(data)
    },
    sellProduct: async (req, res) => {
        const { productCode, productName, productType, price, quantity, category } = req.query // get luon luon dung query
        const data = { productCode, productName, productType, price, quantity, category }
        const sell = await adminHandler.testAggerate(data)
        console.log(sell)
        res.json(sell)
    },
    searchProduct: async (req, res) => {
        const { productCode, productName, productType, price, quantity, category } = req.query // get luon luon dung query
        const data = { productCode, productName, productType, price, quantity, category }
        const output = await adminHandler.searchProduct(data)
        console.log(output)
        res.json(output)
    },
    testAggerate: async (req, res) => {
        const { orderItem, shippingAddress, country, phone, status, customers,dateOrdered } = req.query // get luon luon dung query
        const data = { orderItem, shippingAddress, country, phone, status, customers,dateOrdered }
        const del = await adminHandler.testAggerate(data)
        console.log(del)
        res.json(sell)
    }
}