const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const reviewModel=require("../models/reviewModel")


const createBook = async function(req,res){
    try{
    data = req.body

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

    if(data.userId.length!== 24){
        return res.status(400).send({ status: false, message: "Invalid User ID" })
    }
     //Check if ISBN present in a body or not
    if (!data.ISBN) {
        return res.status(400).send({ status: false, message: "ISBN is required" })
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

    if(!data.releasedAt) {
        return res.status(400).send({ status: false, message: "released Date is required" })
    }
    let isValidDateFormat =  /^\d{4}-\d{2}-\d{2}$/
    if(!isValidDateFormat.test(data.releasedAt)){
        return res.status(400).send({ status: false, message: "Format of data Should be in YYYY-MM-DD" })
    }
//Checking the uniqueness of title
    let checkTitle = await bookModel.findOne({title:data.title})
    if(checkTitle){
        return res.status(400).send({status:false , message : "Title is already present"})
    }

//Checking the uniqueness of UserId
    let checkUserId = await userModel.findOne({_id:data.userId})
    if(!checkUserId){
        return res.status(400).send({status:false , message : "User Id is not valid"})
    }

    //Checking the uniqueness of ISBN
    let checkIsbn =  await bookModel.findOne({ISBN:data.ISBN})
    if(checkIsbn){
        return res.status(400).send({status:false , message : "ISBN is already present"})
    }

// creating the documents of book collection
    let books = await bookModel.create(data)
    
    res.status(201).send({ status: true, message: "success", data: books })


}
catch (err) {
    res.status(500).send({Status: false, msg: "Error", error: err.message })
}
}

 
const getBooks=async function(req,res){
     let data=req.query
     //when filter(query)not used
     if(Object.keys(data).length===0){
             let allBooks= await bookModel.find({isDeleted:false}).select({ ISBN:0,subcategory:0, deletedAt:0,isDeleted:0,createdAt:0, updatedAt:0}).sort({title:1})
             if(allBooks.length==0) return res.status(404).send({status:false,message:"No Books found"})
            return res.status(200).send({stats:true,message:"Books list",data:allBooks})
        }
    //when filter used
      let filterBooks=await bookModel.find({$and:[data,{isDeleted:false}]}).sort({title:1}) 
      if(filterBooks.length==0) return res.status(404).send({status:false,message:"No Books found"})
     return res.status(200).send({status:true,message:"Books list",data:filterBooks})

}



const getBookSByBookId= async function(req,res){
    let data=req.params.bookId
    let getBook=await bookModel.findOne({_id:data,isDeleted:false})
    if(getBook===null) return res.stats(404).send({status:false,message:"BookId not exist"})
   let reviewsData=await reviewModel.find({bookId:data,isDeleted:false})
    getBook.reviewsData=reviewsData
    return res.stats(200).send({status:true,message:"book list",data:getBook})
}



module.exports.createBook = createBook
module.exports.getBooks=getBooks
module.exports.getBookSByBookId=getBookSByBookId

