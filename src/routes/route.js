const express = require('express')
const router = express.Router()
const userController =require("../controllers/userController")
const bookController =require("../controllers/bookController")
const auth = require("../middleWare/auth")

//user creation
router.post("/register",userController.createUser)

//user Login
router.post("/login",userController.login)

//book creation
router.post("/books",bookController.createBook)

module.exports =router