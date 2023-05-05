const { query } = require('express');
const { ulid } = require('ulid');
const customerDto = require('../models/customers');
module.exports = {
    
    regis: async (data) => {
        data.uid = ulid()
        const addCustomer = await customerDto.create({
            ...data,
        })
        return addCustomer
    },
    search: async (data) => {
        const searchCustomer = await customerDto.find({
            "name": data.name ? { $regex: data.name.toLowerCase(), $options: 'i' } : { $regex: '', $options: 'i' },
            "email": data.email ? { $regex: data.email.toLowerCase(), $options: 'i' } : { $regex: '', $options: 'i' }
        }).select('name email phone')
        console.log(data)
        return searchCustomer;
    },
    // search: async (data) => {
    //     const searchCustomer = await customerDto.findById({"_id":data._id}).select('-password')
    //     console.log(data)
    //     return searchCustomer;
    // },
    list: async (data) => {
        const listCustomer = await customerDto.find().select('uid name email phoneNumber address city ')
        console.log(data)
        return listCustomer;
        
    //     customerDto.find().exec().then(data =>{
    //         console.log(data);
    //         res.status(200).json(data)
    //    }).catch(err =>{
    //     console.log(err)
    //     res.status(500).json({error:err})
    //    })
    },
    delete: async (data) => {
        try {
            const query = { "email": data.email }
            const deleteCustomer = await customerDto.deleteOne(query);
            return deleteCustomer
        } catch (error) {
            console.log(error)
        }
    },
    edit: async (data) => {
        const query = { "name": data.name }
        const newValue = {
            $set: {
                "email": data.email, "password": data.password,
                "phoneNumber": data.phoneNumber,"address": data.address,"city": data.city
            }
        }
        const updateCustomer = await customerDto.findOneAndUpdate(query, newValue)
        return updateCustomer
    },
}