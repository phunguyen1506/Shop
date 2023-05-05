const { checkSchema, check } = require('express-validator');
const customerDTO = require('../models/customers');
const customer = require('../controllers/customer');
const bcrypt = require('bcryptjs');
// const googleBibphonenumber = require('google-libphonenumber');
// const emailValidator = require('email-validator');
// class Validate {
//     constructor() {}
//     static phone(number) {
//       const phoneUtil = googleBibphonenumber.PhoneNumberUtil.getInstance();
//       const country = process.env.COUNTRY || 'VN';
//       const pare = phoneUtil.parseAndKeepRawInput(number, country);
//       const ret = phoneUtil.isValidNumberForRegion(pare, country);
//       return ret;
//     }
//     static email(email) {
//       const ret = emailValidator.validate(email);
//       return ret;
//     }
//   }
// module.exports = { Validate: Validate };
module.exports = {
    validateCreate: (reqSchema) => {
        return [
            checkSchema(reqSchema), (req, res, next) => {
                const { name, email, password, phoneNumber, address, city } = req.body// get luon luon dung query
                const data = { name, email, password, phoneNumber, address, city }
                try {
                    // check(!data.name).notEmpty().withMessage('Name is required')
                    // check(data.email).notEmpty().withMessage('Email is required')
                    // check(data.email).isEmail().withMessage('Email only using (a-z),(0-9),(.),(@) format'

                    if (!data.name) {
                        throw {
                            status: 400,
                            message: 'Name is required'
                        };
                    }
                    if (data.name.length > 50) {
                        throw {
                            status: 400,
                            message: 'Name must be less than 50 characters'
                        }
                    }

                    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
                    const validPhone = phoneRegex.test(data.phoneNumber)
                    if (!validPhone) {
                        throw {
                            status: 400,
                            message: 'phone number invalid'
                        };
                    }
                    if (validPhone.length > 11) {
                        throw {
                            status: 400,
                            message: 'phone number less than 11 characters'
                        }
                    }
                    if (!data.phoneNumber) {
                        throw {
                            status: 400,
                            message: 'phone number is required'
                        };
                    }

                    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    const validemail = emailRegex.test(data.email)//ton tai ?

                    if (!validemail) {
                        throw {
                            status: 400,
                            message: 'Email only using (a-z),(0-9),(.),(@) format'
                        };
                    }
                    if (!data.email) {
                        throw {
                            status: 400,
                            message: 'Email is required'
                        };
                    }
                    if (data.password.length < 8) {
                        throw {
                            status: 400,
                            message: 'Password must have Minimum eight characters'
                        }
                    }
                    if (!data.password) {
                        throw {
                            status: 400,
                            message: 'Password is required'
                        };
                    }
                    next();
                } catch (error) {
                    return res.status(error.status).json({
                        success: false,
                        msg: error,
                    });
                }
            }
        ]
    },
    validateupdate: (reqSchema) => {
        return [
            checkSchema(reqSchema), (req, res, next) => {
                const { name, email, password, phoneNumber, address, city } = req.query// get luon luon dung query
                const data = { name, email, password, phoneNumber, address, city }
                try {
                    if (!data.name) {
                        throw {
                            status: 400,
                            message: 'Name is required'
                        };
                    }
                    if (data.name.length > 50) {
                        throw {
                            status: 400,
                            message: 'Name must be less than 50 characters'
                        }
                    }
                    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
                    const validPhone = phoneRegex.test(data.phoneNumber)
                    if (!validPhone) {
                        throw {
                            status: 400,
                            message: 'phone number invalid'
                        };
                    }
                    if (validPhone.length > 11) {
                        throw {
                            status: 400,
                            message: 'phone number less than 11 characters'
                        }
                    }
                    if (!data.phoneNumber) {
                        throw {
                            status: 400,
                            message: 'phone number is required'
                        };
                    }
                    const emailExsit = await
                    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    const validemail = emailRegex.test(data.email)

                    if (!validemail) {
                        throw {
                            status: 400,
                            message: 'Email only using (a-z),(0-9),(.),(@) format'
                        };
                    }
                    if (!data.email) {
                        throw {
                            status: 400,
                            message: 'Email is required'
                        };
                    }
                    if (data.password.length < 8) {
                        throw {
                            status: 400,
                            message: 'Password must have Minimum eight characters'
                        }
                    }
                    if (!data.password) {
                        throw {
                            status: 400,
                            message: 'Password is required'
                        };
                    }
                    next();
                } catch (error) {
                    return res.status(error.status).json({
                        success: false,
                        msg: error,
                    });
                }
            }
        ]
    },
    validateEmail: (reqSchema) => {
        return [
            checkSchema(reqSchema), async (req, res, next) => {
               const customers = await customerDTO.findOne({
                    "email" : req.body.email
                })
                if(customers){
                    res.status(400).send({message:'Email already in use'})
                    return
                }
                next()
            }
        ]
    },
    validatePassword: (reqSchema) => {
        return [
            checkSchema(reqSchema), async (req, res, next) => {
               const customers = await customerDTO.findOne({
                    email : req.body.email
                })
                if(customers && bcrypt.compareSync(req.body.password, customers.password)){
                   res.status(200).send('user Auth')
                }else{
                    res.status(400).send('Password not correct !!!')
                }
                next()
            }
        ]
    },
}


