const { validationResult } = require('express-validator');
const customerHandler = require('../handler/customers');
const bcrypt = require('bcryptjs')
const customerDTO = require('../models/customers')
module.exports = {
    login: async (req, res, next) => {
        const customerReq = await customerDTO.findOne({ email: req.body.email })
        if (!customerReq) {
            return res.status(404).json({
                error: 'Customer not found'
            })
        }
        if(customerReq && bcrypt.compareSync(req.body.password, customerReq.password)){
            res.status(200).send('user Auth')
         }else{
             res.status(400).send('Password not correct !!!')
         }
         next();
    },

    register: async (req, res) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            city: req.body.city
        }
        try {
            customerHandler.regis(data);
            return res.status(200).json(data)
        } catch (err) {
            return res.status()
        }
    },

    getProduct: async (req, res) => {
        res.send('Product')
    },
    order: async (req, res) => {
        res.send('Order')
    },
    searchCustomer: async (req, res) => {
        const { name, email, password, phoneNumber, address, city } = req.query// get luon luon dung query
        const data = { name, email, password, phoneNumber, address, city }
        const ouput = await customerHandler.search(data)
        console.log(ouput)
        res.json(ouput)
    },
    listCustomer: async (req, res) => {
        const { name, email, password, phoneNumber, address, city } = req.query
        const data = { name, email, password, phoneNumber, address, city }
        const output = await customerHandler.list(data);
        console.log(output)
        res.json(output)
    },
    updateCustomer: async (req, res) => {
        const { name, email, password, phoneNumber, address, city } = req.query// get luon luon dung query
        const data = { name, email, password, phoneNumber, address, city }
        const output = await customerHandler.edit(data);
        console.log(output)
        res.json({ sucess: true, result: output })
    },
    deleteCustomer: async (req, res) => {
        const { name, email, password, phoneNumber, address, city } = req.query // get luon luon dung query
        const data = { name, email, password, phoneNumber, address, city }
        const output = await customerHandler.delete(data)
        res.send(output)
    }
}