const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

//function to create review document
const createReview = async function (req, res) {
    try {
        let data = req.body
        let bookId = req.params.bookId
        data.bookId = bookId
        //checkiing if book id is present in params or not
        if (!bookId) {
            return res.status(400).send({ status: false, message: "bookId in params must be given" })
        }

        //checking if any data is given inside the body or not
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "data must be given" })
        }




        //finding the document in book collection which is not deleted(isDeleted:false) by using bookId
        let checkBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!checkBook) {
            return res.status(400).send({ status: false, mesaage: "document of a book not found" })
        }



        //checking if rating is not given in a body or not
        if (!data.rating) {
            return res.status(400).send({ status: false, message: "rating is required" })
        }
        //validating the rating (min:1 and max:5) by using regex
        let isValidRating = /^[1-5]{1}$/
        if (!(isValidRating.test(data.rating))) {
            return res.status(400).send({ status: false, message: "rating should be from 1 to 5" })
        }
        //updating the reviews key and incrementing its count whenever the new document of a review of that bookId is created
        let updateReviewsOfBook = await bookModel.findOneAndUpdate({ _id: bookId },
            { $inc: { reviews: 1 } },
            { new: true })

        // creating the document of review collection
        let createReviewData = await reviewModel.create(data)
        let reviewsData = await reviewModel.find({ bookId: data.bookId, isDeleted: false }).select({ isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 })
        let finalData = {
            "_id": updateReviewsOfBook._id,
            "title": updateReviewsOfBook.title,
            "excerpt": updateReviewsOfBook.excerpt,
            "userId": updateReviewsOfBook.userId,
            "category": updateReviewsOfBook.category,
            "subcategory": updateReviewsOfBook.subcategory,
            "deleted": updateReviewsOfBook.deleted,
            "reviews": updateReviewsOfBook.reviews,
            "deletedAt": updateReviewsOfBook.deletedAt,
            "releasedAt": updateReviewsOfBook.releasedAt,
            "createdAt": updateReviewsOfBook.createdAt,
            "updatedAt": updateReviewsOfBook.updatedAt,
            "reviewsData": reviewsData
        }

        return res.status(201).send({ status: true, message: "success", data: finalData })
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}


//*******************creating a function to update the document of review collection *****************************//

const updateReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        //Checking if book document is present in book Collection or not
        let checkBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!checkBook) {
            return res.status(400).send({ status: false, message: "Book document not found" })
        }

        //Checking if book document is present in book Collection or not
        let checkReviewId = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReviewId) {
            return res.status(400).send({ status: false, message: "review document not found" })
        }

        let data = req.body

        //checking If any data is given inside body or not
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Data must be given for updation" })
        }

        // Only the values of review , rating , reviewer's name should be updated 
        if (data.reviewedAt || data.bookId || data.isDeleted) {
            return res.status(400).send({ status: false, message: "You can only update review , rating , reviewer's name" })
        }

        //Updating the document of review collection
        await reviewModel.findOneAndUpdate({ _id: reviewId },
            data)

        //
        let findReview = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false }).select({ isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 })

        let findBook = await bookModel.findOne({ _id: bookId })

        let newObj = JSON.parse(JSON.stringify(findBook))
        newObj.reviewsData = findReview
        res.status(200).send({ status: true, message: "review update successfully", data: newObj })
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

//***********************************Function to Delete the document of the review collection***************** */
const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        //Checking if book document is present in book Collection or not
        let checkBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!checkBook) {
            return res.status(400).send({ status: false, message: "Book document not found or already deleted" })
        }

        //Checking if book document is present in book Collection or not
        let checkReviewId = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false })
        if (!checkReviewId) {
            return res.status(400).send({ status: false, message: "Review document not found or already deleted" })
        }
        // Deleting the document by updating the isDeleted to True 
        let deleteRev = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: { isDeleted: true } }, { new: true })

        await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } })

        res.status(200).send({ status: true, message: "review is deleted successfully" })
    }

    catch (err) {
        res.status(500).send(err.message)
    }

}

module.exports.createReview = createReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview