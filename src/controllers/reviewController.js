const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

//function to create review document
const createReview = async function(req,res){
    try{
let data = req.body
let bookId=req.params.bookId
//checkiing if book id is present in params or not
if(!bookId){
    return res.status(400).send({status:false , message:"bookId in params must be given"})
}

//checking if any data is given inside the body or not
if(Object.keys(data).length==0){
    return res.status(400).send({status:false , message:"data must be given"})
}

//checking if bookId is present in a body or not
if(!data.bookId){
    return res.status(400).send({status:false , message:"bookId is required"})
}

//checking if bookid given in params is equal to the book id present in body
if(bookId !== data.bookId){
    return res.status(400).send({status:false , message:"book id is not matched"})
}
//finding the document in book collection which is not deleted(isDeleted:false) by using bookId
let checkBook = await bookModel.findOne({_id:bookId,isDeleted:false})
if(checkBook==null){
    return res.status(400).send({status:false , mesaage:"document of a book not found"})
}

//checking if reviewsAt is not given in a body or not
if(!data.reviewedAt){
    return res.status(400).send({status:false , message:"Date of review is required"})
}
//checking if rating is not given in a body or not
if(!data.rating){
    return res.status(400).send({status:false , message:"rating is required"})
}
//validating the rating (min:1 and max:5) by using regex
let isValidRating = /^[1-5]{1}$/
if(!(isValidRating.test(data.rating))){
    return res.status(400).send({status:false , message:"rating should be from 1 to 5"})
}
//updating the reviews key and incrementing its count whenever the new document of a review of that bookId is created
let updateReviewsOfBook = await bookModel.updateOne({_id:bookId},
    {$inc:{reviews:1}})

// creating the document of review collection
let createReviewData = await reviewModel.create(data)
return res.status(201).send({status:true , message:"success" , data:createReviewData})
}
catch(err){
    return res.status(500).send(err.message)  
}
}


module.exports.createReview=createReview