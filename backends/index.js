const express = require('express')
const port = 5000
const bodyParser = require('body-parser')
const app = express()
const db = require('./config/mongoose')
const userRoute = require('./routes/userRoute')
const userDetailsRoute = require('./routes/userDetailsRoute')
const cors = require('cors')

// cors
var corsOption ={
    origin : '*'
}
app.use(cors(corsOption))

// use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// user routes
app.use('/', userRoute)
// user details routes
app.use('/', userDetailsRoute)

// secret key for jwt token
app.set('secretKey', "mern")

// app listen
app.listen(port, function(err){
    if(err) {console.log(err);}
    console.log(`My server is ruuning on: ${port}`);
})