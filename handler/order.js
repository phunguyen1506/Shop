const orderDto = require('../models/order')
const orderitem = require('../models/oderItem')
module.exports = {
  list: async (data) => {
    const listOrder = await orderDto.find()
    console.log(data)
    return listOrder;
  },
  createOrder: async (data) => {
    // const aggregateResult = await orderitem.aggregate([
    //   {
    //     $lookup: {
    //       from: 'products',
    //       localField: 'product',
    //       foreignField: '_id',
    //       as: 'product'
    //     }
    //   },
    //   { $unwind: '$product' },
    //   {
    //     $addFields: {
    //       total: {
    //         $multiply: [
    //           { $convert: { input: '$quantity', to: 'double' } },
    //           { $convert: { input: '$product.price', to: 'double' } }
    //         ]
    //       }
    //     }
    //   },
    //   {
    //     $project: {
    //       quantity: 1,
    //       price: '$product.price',
    //       customers: '$customers',
    //       totalPrice: '$total'
    //     }
    //   }
    // ])

    const orderItemIds = await Promise.all(data.orderItem.map(async orderItem => {
      let newOrderItem = orderitem({
        quantity: orderItem.quantity,
        product: orderItem.product
      })
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    }))
    const orderItemsResolved = await orderItemIds
    const totalPrices = await Promise.all(orderItemsResolved.map(async (orderItemId) => {
      const orderItem = await orderitem.findById(orderItemId).populate('product', 'price')
      const totalPrice = orderItem.product.price * orderItem.quantity

      return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    console.log(totalPrice)
    console.log(orderItemsResolved);
    const order = new orderDto({
      orderItem: orderItemsResolved,
      shippingAddress: data.shippingAddress,
      city: data.city,
      country: data.country,
      phone: data.phone,
      customers: data.customers,
      totalPrice: totalPrice
    });

    const neworder = await order.save();

    return neworder;
  },
  updateStatus: async(data) => {
    const order = await orderDto.findByIdAndUpdate(data._id,{
      status: data.status
    },{new: true})
    return order
  }
}

