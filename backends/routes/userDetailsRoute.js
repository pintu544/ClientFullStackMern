const express = require('express')
const { createUser, deleteUser, getUsers, updateUser } = require('../controller/userDetailsController')
const route = express.Router()

// create user
route.post('/createUser', createUser)
// fetch all user
route.get('/getUsers', getUsers)
// delete user
route.delete('/deleteUser/:id', deleteUser)
// update user
route.patch('/updateUser/:id',updateUser)


module.exports = route