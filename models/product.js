const mongoose = require('mongoose')
const Schema = mongoose.Schema

const add = new Schema({
    uid: { type: String },
    productCode: {
        type: String,
        require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    productType: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    
})
const productModel = mongoose.model('products', add)
module.exports = productModel