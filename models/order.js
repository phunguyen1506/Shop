const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    orderItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress:{
        type: String,
        
    },
    city:{
        type: String,
    
    },
    country:{
        type: String,
     
    },
    phone:{
        type: Number,
       
    },
    status:{
        type: String,
        required:true,
        default: 'Acepted'
    },
    totalPrice:{
        type: Number,
    },
    customers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    dateOrdered:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order',orderSchema)