const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController=require("../controllers/publisherController")


router.post("/createAuthor", authorController.createAuthor  )

router.post("/createpublisher", publisherController.createPublisher )

router.post("/createtBooks", bookController.createtBooksData)

router.get("/getallBooksWithAuthorAndpublisher", bookController.getallBooks)

module.exports = router;