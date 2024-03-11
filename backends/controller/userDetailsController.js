const User = require("../models/UserDetails");

// create a user
exports.createUser = async(req,res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            project: req.body.project
           

        })
        if(!user) {
            return res.status(400).json({message: "User creation error!!!"})
        }
        return res.status(200).json({message: "User added successfully!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

// read or fetch all user
exports.getUsers = async(req,res) => {
    try {
        const user = await User.find()
        if(!user){
            return res.status(400).json({message: "User fetching error!!!"})
        }
        return res.status(200).json({user: user,message: "User fetch successfully!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

// delete a user
exports.deleteUser = async(req,res) => {
    console.log(req.params.id);
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id})
        if(!user){
            return res.status(400).json({message: "User deletion error!!!"})
        }
        return res.status(200).json({message: "User delete successfully!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

// update user
exports.updateUser = async(req,res) => {
    
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            project: req.body.project
        })
        if(!user){
            return res.status(400).json({message: "User updating error!!!"})
        }
        return res.status(200).json({message: "User updated successfully!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

