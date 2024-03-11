const mongoose = require('mongoose')
 
const userSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    
    issueDate:{
        type: String
    }
},{timeStamp: true})

const UserDetails = mongoose.model('UserDetails', userSchema);

module.exports = UserDetails
