const { checkSchema } = require('express-validator')
module.exports = {
    validateCreate: (reqSchema) => {
        return [
            checkSchema(reqSchema), (req, res, next) => {
                const { productCode, productName, productType, price, quantity, category } = req.body
                const data = { productCode, productName, productType, price, quantity, category }
                try {
                    if (!data.productCode || !data.productName || !data.productType) {
                        return res.status(400).json({
                            status: 400,
                            message: 'Fields are required'
                        })
                    }
                    if (data.productCode.length > 50) {
                        return res.status(400).json({
                            status: 400,
                            message: 'productCode have to be less than 50 characters'
                        })
                    }
                    if (data.productName.length > 50) {
                        return res.status(400).json({
                            status: 400,
                            message: 'ProductName have to be less than 50 characters'
                        })
                    }
                    if (data.productType.length > 30) {
                        return res.status(400).json({
                            status: 400,
                            message: 'ProductType have to be less than 30 characters'
                        })
                    }
                    next();
                } catch (error) {
                    return res.status(400).json({
                        sucess: false,
                        msg: error
                    })
                }
            }
        ]
    },
    validateEdit: (reqSchema) => {
        return [
            checkSchema(reqSchema), (req, res, next) => {
                const { productCode, productName, productType, price, quantity, category } = req.query
                const data = { productCode, productName, productType, price, quantity, category }
                try {
                    if (!data.productCode || !data.productName || !data.productType) {
                        return res.status(400).json({
                            status: 400,
                            message: 'Fields are required'
                        })
                    }
                    if (data.productCode.length > 50) {
                        return res.status(400).json({
                            status: 400,
                            message: 'productCode have to be less than 50 characters'
                        })
                    }
                    if (data.productName.length > 50) {
                        return res.status(400).json({
                            status: 400,
                            message: 'ProductName have to be less than 50 characters'
                        })
                    }
                    if (data.productType.length > 30) {
                        return res.status(400).json({
                            status: 400,
                            message: 'ProductType have to be less than 30 characters'
                        })
                    }
                    next();
                } catch (error) {
                    return res.status(400).json({
                        sucess: false,
                        msg: error
                    })
                }
            }
        ]
    }, 
    validateSelling: (reqSchema) => {
        return [
            checkSchema(reqSchema), (req, res, next) => {
                const { quantity }=req.query
                const data = {quantity}
                try {
                    if(data.quantity == 0){
                        return res.status(400).json({
                            status : 400,
                            message : 'Quantity out of stock'
                        })
                    }
                } catch (error) {
                    
                }
            }
        ]
    }
}