const express = require("express");
const { body } = require("express-validator");
const { customerController } = require("../controllers");
const { validateCreate, validateupdate, validateEmail } = require('../validate/customer')

const router = express.Router();
// login
router.get("/", (req, res) => {
  res.send("get customer");
});
router.post('/login',customerController.login)
router.get('/product', customerController.getProduct);
router.get('/listCustomer', customerController.listCustomer);
router.get('/:id', customerController.searchCustomer)

router.post("/register",
  validateCreate(customerController.register),
  validateEmail(customerController.register),
  customerController.register
);

router.put('/editCustomer',
  validateupdate(customerController.updateCustomer),
  customerController.updateCustomer);

router.delete('/deleteCustomer', customerController.deleteCustomer);

module.exports = router;
