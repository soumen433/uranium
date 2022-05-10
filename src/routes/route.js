const express = require('express')
const router = express.Router()
const userController =require("../controllers/userController")
const bookController =require("../controllers/bookController")


//user creation
router.post("/register",userController.createUser)

//user Login
router.post("/login",userController.login)

//book creation
router.post("/books",bookController.createBook)

//get books
router.get("/books",bookController.getBooks)
//get books by ib
router.get("/books/:bookId",bookController.getBookSByBookId)

module.exports =router