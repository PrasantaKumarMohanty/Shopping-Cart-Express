const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./route/userRoute')
const productRoute=require('./route/productRoute')
require("dotenv").config();

const app = express()
app.use(express.json())

app.use(bodyParser.json())

// mongoose.connect('mongodb+srv://Prasant:buntylily11@cluster0.p1cp1.mongodb.net/expressDB?retryWrites=true&w=majority',
//     () => { console.log("Connected To Database") })

mongoose.connect('mongodb://localhost:27017/test-express', ()=>{
    console.log("DB connected")
})
mongoose.connection.on('open', () => {
    console.log('connected to database');
});

app.use('/user', userRoute)
app.use('/product', productRoute)


app.listen(4001, () => { console.log('http://ocalhost:4001/user') })

