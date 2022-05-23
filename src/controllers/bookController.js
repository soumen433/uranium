const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const reviewModel = require("../models/reviewModel")
const aws= require("aws-sdk")
//const res = require("express/lib/response")
aws.config.update({
    accessKeyId: "AKIAY3L35MCRUJ6WPO6J",
    secretAccessKey: "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",
    region: "ap-south-1"
})
let uploadFile= async ( file) =>{
    return new Promise( function(resolve, reject) {
     // this function will upload file to aws and return the link
     let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws
 
     var uploadParams= {
         ACL: "public-read",
         Bucket: "classroom-training-bucket",  //HERE
         Key: "soumen/" + file.originalname, //HERE 
         Body: file.buffer
     }
 
 
     s3.upload( uploadParams, function (err, data ){
         if(err) {
             return reject({"error": err})
         }
         console.log(data)
         console.log("file uploaded succesfully")
         return resolve(data.Location)
              })
    
    })
}

const createBook = async function (req, res) {
    try {

        let data = req.body

        //Check if Body is empty or not
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "data must be required" })
        }

        //Check if title present in a body or not
        if (!data.title) {
            return res.status(400).send({ status: false, message: "title is required" })
        }



        //Check if excerpt present in a body or not
        if (!data.excerpt) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        }

        //Check if userId present in a body or not
        if (!data.userId) {
            return res.status(400).send({ status: false, message: "userId is required" })
        }

        if (data.userId.length !== 24) {
            return res.status(400).send({ status: false, message: "Invalid User ID" })
        }
        //Check if ISBN present in a body or not
        if (!data.ISBN) {
            return res.status(400).send({ status: false, message: "ISBN is required" })
        }

        //validating ISBN Number (Format ==> 912-9856321879)

        let isValidIsbn = /^[0-9]{3}[-]{1}[0-9]{10}$/
        if (!isValidIsbn.test(data.ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN Number is not in a valid format (eg :- 912-9856321879) " })
        }
        //Check if Category  present in a body or not
        if (!data.category) {
            return res.status(400).send({ status: false, message: "category is required" })
        }

        //Check if subcategory present in a body or not
        if (!data.subcategory) {
            return res.status(400).send({ status: false, message: "subcategory is required" })
        }

        //Check if realeased Date is present in a body or not

        if (!data.releasedAt) {
            return res.status(400).send({ status: false, message: "released Date is required" })
        }
        let isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/
        if (!isValidDateFormat.test(data.releasedAt)) {
            return res.status(400).send({ status: false, message: "Format of data Should be in YYYY-MM-DD" })
        }
        //Checking the uniqueness of title
        let checkTitle = await bookModel.findOne({ title: data.title })
        if (checkTitle) {
            return res.status(400).send({ status: false, message: "Title is already present" })
        }

        //Checking the uniqueness of UserId
        let checkUserId = await userModel.findOne({ _id: data.userId })
        if (!checkUserId) {
            return res.status(400).send({ status: false, message: "User Id is not valid" })
        }

        //Checking the uniqueness of ISBN
        let checkIsbn = await bookModel.findOne({ ISBN: data.ISBN })
        if (checkIsbn) {
            return res.status(400).send({ status: false, message: "ISBN is already present" })
        }
        //usging aws
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            var uploadedFileURL= await uploadFile( files[0] )
           // res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
///adding new key
    data.bookCover=uploadedFileURL
        // creating the documents of book collection
        let books = await bookModel.create(data)

        res.status(201).send({ status: true, message: "success", data: books })


    }
    catch (err) {
        res.status(500).send({ Status: false, msg: "Error", error: err.message })
    }
}

//**********creating a function to fetch the Book documents by giving (some data) in query params*********//
const getBooks = async function (req, res) {
    try {
        let data = req.query

        //when filter(query)not used
        if (Object.keys(data).length === 0) {
            let allBooks = await bookModel.find({ isDeleted: false }).select({ ISBN: 0, deletedAt: 0, isDeleted: 0, createdAt: 0, updatedAt: 0 }).sort({ title: 1 })
            if (allBooks.length == 0) return res.status(404).send({ status: false, message: "No Books found" })
            return res.status(200).send({ stats: true, message: "Books list", data: allBooks })
        }
        //when filter used
        if (!(data.excerpt || data.title || data.ISBN || data.review)) {
            let filterBooks = await bookModel.find({ $and: [data, { isDeleted: false }] }).select({ ISBN: 0, deletedAt: 0, isDeleted: 0, createdAt: 0, updatedAt: 0 }).sort({ title: 1 })
            if (filterBooks.length == 0) return res.status(404).send({ status: false, message: "No Books found" })
            return res.status(200).send({ status: true, message: "Books list", data: filterBooks })
        }
        else {
            return res.status(400).send({ status: false, message: "please select the query :- userId , category , subcategory" })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//****************creating function to get documents of a book By giving bookid in params********************//

const getBookSByBookId = async function (req, res) {
    try {
        let data = req.params.bookId
        let getBook = await bookModel.findOne({ _id: data, isDeleted: false })
        if (getBook === null) return res.status(404).send({ status: false, message: "BookId not exist" })
        let reviewsData = await reviewModel.find({ bookId: data, isDeleted: false }).select({ isDeleted: 0, updatedAt: 0, createdAt: 0, __v: 0 })
        let finalData = {
            "_id": getBook._id,
            "title": getBook.title,
            "excerpt": getBook.excerpt,
            "userId": getBook.userId,
            "category": getBook.category,
            "subcategory": getBook.subcategory,
            "deleted": getBook.deleted,
            "reviews": getBook.reviews,
            "deletedAt": getBook.deletedAt,
            "releasedAt": getBook.releasedAt,
            "createdAt": getBook.createdAt,
            "updatedAt": getBook.updatedAt,
            "reviewsData": reviewsData
        }
        return res.status(200).send({ status: true, message: "book list", data: finalData })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//********************************Update function************************************************//
const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let data = req.body

        //check if any data present in body or not
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Data must be given for Updation" })
        }

        //check if user giving field in body which are not supposed to get Update other than title , excerpt , realeasedAt , ISBN
        if (data.userId || data.category || data.subcategory || data.reviews || data.deletedAt || data.isDeleted) {
            return res.status(400).send({ status: false, message: "You can only update title , excerpt , releasedAt , ISBN" })
        }
        //validating ISBN Number (Format ==> 912-9856321879)
        let isValidIsbn = /^[0-9]{3}[-]{1}[0-9]{10}$/
        if (!isValidIsbn.test(data.ISBN)&&data.ISBN) {
            return res.status(400).send({ status: false, message: "ISBN Number is not in a valid format (eg :- 912-9856321879) " })
        }

        //checking the uniqueness of title and ISBN
        let checkUniqueTitle = await bookModel.findOne({ title: data.title })

        if (checkUniqueTitle) {
            
                return res.status(400).send({ status: false, message: "Title is already present" })
            }

            let checkUniqueISBN = await bookModel.findOne({ ISBN: data.ISBN})

            if (checkUniqueISBN) {
            
                return res.status(400).send({ status: false, message: "ISBN is already present" })
            }
        
    
        //Updation of a book
        let updateData = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            { $set: data },
            { new: true }
        )
        if (!updateData) {
            return res.status(404).send({ status: false, message: "BookId Not found" })
        }
        return res.status(200).send({ status: true, message: "Updated Successfully", data: updateData })
    }
    catch (err) {
        return res.status(500).send(err.message)
    }


}

//**************************Function to delete the documents of book collection***********************//

const deleteData = async function (req, res) {
    try {
        let id = req.params.bookId

        //check if the document is found with that book id and check if it already deleted or not
        let verification = await bookModel.findById(id)
        if (!verification) {
            return res.status(404).send({ Status: false, msg: "Document Not Found" })
        }
        if (verification.isDeleted === true) {
            return res.status(400).send({ Status: false, msg: "Document already deleted" })
        }
        //secussfully deleted book data
        else {
            let FinalResult = await bookModel.findByIdAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
            return res.status(200).send({ Status: true, message: " Successfully deleted the book "})
        }
    }
    catch (err) {
        return res.status(500).send({ Status: false, msg: "Error", error: err.message })
    }
}




module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBookSByBookId = getBookSByBookId
module.exports.updateBook = updateBook
module.exports.deleteData = deleteData
