const express = require('express')
const router = express.Router()
const userController =require("../controllers/userController")
const bookController =require("../controllers/bookController")
const reviewController=require("../controllers/reviewController")
const auth = require("../middleWare/auth")

//user creation
router.post("/register",userController.createUser)

//user Login
router.post("/login",userController.login)

//book creation
router.post("/books",auth.authentication,auth.authorization,bookController.createBook)

//get books
router.get("/books",auth.authentication,bookController.getBooks)

//get books by id
router.get("/books/:bookId",auth.authentication,bookController.getBookSByBookId)

//Update the datails of a book
router.put("/books/:bookId",auth.authentication,auth.authorization,bookController.updateBook)

//deleted book
router.delete("/books/:bookId",auth.authentication,auth.authorization,bookController.deleteData)

//Post api of review 
router.post("/books/:bookId/review",reviewController.createReview)
module.exports =router