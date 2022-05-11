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
router.post("/books",auth.authentication,bookController.createBook)

//get books
router.get("/books",bookController.getBooks)

//get books by id
router.get("/books/:bookId",bookController.getBookSByBookId)

//Update the datails of a book
router.put("/books/:bookId",bookController.updateBook)

//deleted book
router.delete("/books/:bookId",bookController.deleteData)

module.exports =router