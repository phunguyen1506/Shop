
const orderHandler = require('../handler/order')
const orderDTO = require('../models/order')
const OrderItem = require('../models/oderItem')
module.exports = {
    listOrder:async(req,res,next) => {
        const {orderItem, shippingAddress,country,phone,status,totalPrice,customers,dateOrdered} =req.body
        const data = {orderItem, shippingAddress,country,phone,status,totalPrice,customers,dateOrdered}
        const output = await orderHandler.list(data);
        console.log(output)
        res.json(output)
    },
    newOrder: async (req, res, next) => {
        const {
            orderItem,
            shippingAddress,
            country,
            phone,
            customers
        } = req.body
        const data = {
            orderItem,
            shippingAddress,
            country,
            phone,
            customers
        }
        const output = await orderHandler.createOrder(data);
        console.log(output)
        res.json(output)
        
    },
    updateStatus: async (req, res, next) => {
        try {
            const orderId = req.params.id; 
            const { status } = req.body; 
            const data = { _id: orderId, status }; 
            const output = await orderHandler.updateStatus(data);
            console.log(output)
            res.json(output)
            next()
        } catch (error) {
           
            res.status(400).json({
                message: error.message
            })
        }
       
    }
    // newOrder: async (req, res, next) => {
    //     const orderItemIds =await Promise.all(req.body.orderItem.map(async orderItem => {
    //         let newOrderItem = OrderItem({
    //             quantity: orderItem.quantity,
    //             product: orderItem.product
    //         })
    //         newOrderItem = await newOrderItem.save();
    //         return newOrderItem._id;
    //     }))

    //     let newOrder = orderDTO({
    //         orderItem: orderItemIds,
    //         shippingAddress: req.body.shippingAddress,
    //         city: req.body.city,
    //         country: req.body.country,
    //         phone: req.body.phone,
    //         status: req.body.status,
    //         totalPrice: req.body.totalPrice,
    //         customers: req.body.customers
    //     })
    //     newOrder = await newOrder.save()
    //     if (!newOrder) {
    //         return res.status(400).json({
    //             message: 'cannot create new order'
    //         })
    //     }
    //     res.send(newOrder)
    // }
}