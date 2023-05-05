const productDTO = require('../models/product')
const { ulid } = require('ulid');
module.exports = {

    getAllProducts: async (data) => {
        const allproducts = await productDTO.find({})
        console.log(data)
        return allproducts
    },
    addProduct: async (data) => {
        data.uid = ulid()
        const addproduct = await productDTO.create({
            ...data
        })
        return addproduct
    },
    editproduct: async (data) => {
        const query = { "productCode": data.productCode }
        const newValue = {
            $set: {
                "productName": data.productName,
                "productType": data.productType,
                "price": data.price,
                "quantity": data.quantity,
                "category": data.category
            }
        }
        const updateProduct = await productDTO.findOneAndUpdate(query, newValue)
        return updateProduct
    },
    deleteproduct: async (data) => {
        try {
            const query = { "productCode": data.productCode }
            const deleteproduct = await productDTO.deleteOne(query)
            return deleteproduct
        } catch (error) {
            console.log(error)
        }
    },
    searchProduct: async (data) => {
        const searchproduct = await productDTO.find({
            "productType": data.productType ? { $regex: data.productType.toLowerCase(), $options: 'i' } : { $regex: '', $options: 'i' }
        })
        console.log(data)
        return searchproduct;
    },
    //     aggregate-$match operators
    //
    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate([{$match : {"productName": data.productName}}])
    //     console.log(data)
    //     return testAggerate;
    // }  

    //      aggregate-$project operators
    // testAggerate: async (data) => {             //$address.name
    //     const testAggerate = await productDTO.aggregate([{
    //         $project: {
    //             productType: 1,
    //             price: 1,
    //             quantity: 1,
    //             category: 1
    //         }
    //     }])
    //     return testAggerate
    // }

    // //   aggregate-$limit operators
    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate([{$limit :2 }])
    //     return testAggerate
    // },

    // // // //   aggregate-$group operators !!! 
    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate([{
    //         $group: {
    //             _id: "$category",// Lấy trường category dưới dạng _id
    //             productName:{$first : "$productName"},// lấy 2 cái tên đầu tiên sau khi đã nhóm theo category
    //             price:{
    //                 $sum: "$price" // tính tổng tiền của những trường đã nhóm 
    //             }
    //         }
    //     }])
    //     return testAggerate
    // }

    // //      aggregate-$sort operators // sap xep 
    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate([{ $sort: { price: 1 } }])
    //     return testAggerate
    // }

    //   aggregate conbine operators : $match-$project // chỉnh định 1 tên của bảng rồi lấy thuộc tính tương ứng

    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate([
    //     {
    //         $match:{"productName": data.productName}
    //     },{
    //         $project:{
    //             productName : 1,
    //             price : 1,
    //             quantity : 1,
    //             category : 1
    //         }
    //     }]) 
    //     return testAggerate
    // }
    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate([{
    //         $match: { "category": data.category }
    //     }, {
    //         $project: {
    //             category: 1,
    //             price: 1,
    //             productName: 1
    //         }
    //     }, {
    //         $sort: { price: 1 }
    //     }])
    //     return testAggerate
    // }
    // testAggerate: async (data) => {
    //     const testAggerate = await productDTO.aggregate({
    //         "quantity":data.quantity,
    //     })
           
    //     return testAggerate
    // }
}