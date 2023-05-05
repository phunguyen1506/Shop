const mongoose = require('mongoose');
const { notify } = require('../routers/product');
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectID

const regis = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true 
    },
    phoneNumber: { type: Number },
    address: { type: String },
    city: { type: String },
})
// Comment.prototype('save', function(next){
//     notify(this.get(''))
//     next();
// })
const customerModel = mongoose.model('customers', regis)

module.exports = customerModel;
