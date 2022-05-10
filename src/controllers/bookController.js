const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")


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





module.exports.createBook = createBook

