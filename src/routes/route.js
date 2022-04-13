const express = require('express');
const router = express.Router();

const BookController= require("../controllers/bookController")

router.post("/createBook", BookController.createBook  )

router.get("/Allbooklist",BookController.Booklist)

router.post("/getbookinYear",BookController.getBooksInyear)

router.post("/perticulerbook",BookController.particularBook)

router.get("/INRbook",BookController.getXINRbooks)

router.get("/getrandomBook",BookController.getRandomBooks)

module.exports = router;