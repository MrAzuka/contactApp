const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const {SECRET, EXPIRE_TIME} = process.env


exports.signUp = (req,res) => {
    // fetch email
    // check if email already exist
    Users.findOne({email: req.body.email}, (err,existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        if(existingUser) {
            res.status(400).json({message: "A user already has that email"})
        }
        // Create new user
        Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, (err, newUser) => {
            if(err){
             res.status(500).json({err})
            }
            // hash the password
            bcrypt.genSalt(10,(err, salt) => {
                if(err) {
                    res.status(500).json({err})
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        res.status(500).json({err})
                    }
                    // save the password to the database
                    newUser.password = hashedPassword
                    newUser.save((err, savedUser) => {
                        if (err) {
                            res.status(500).json({err})
                        }
                        // create jwt for users
                        jwt.sign({
                            id: newUser._id,
                            email: newUser.email,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName
                        }, SECRET, {expiresIn: EXPIRE_TIME},
                        (err, token) => {
                            if (err) {
                                res.status(500).json({err})
                            }else{
                                res.status(200).json({message: "User Registration Successful", token})
                            }
                        } )
                    })
                })
            })
        })
    })
}