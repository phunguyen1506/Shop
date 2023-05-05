const mongoose = require('mongoose')
const express = require('express')
const cors =require('cors')
const bodyParser = require('body-parser');
const {
    customerRouter,
    adminRouter,
    orderRouter
} = require('./routers/index.js')
const { customerController } = require('./controllers/index.js')
const app = express()
app.use(express.json())
const port = 3001

app.use('/customer', customerRouter)
app.use('/admin', adminRouter)
app.use('/order',orderRouter)


app.get('/', (req, res) => {
    res.send('Hello World, from express');
})

app.listen(port, async () => {
    console.log(`listening on port ${port}`)
})
mongoose.connect('mongodb://localhost:27017/dbcataloues').then(() => {
    console.log('connected !!!')
})
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

