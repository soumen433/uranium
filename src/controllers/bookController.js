//const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const authorModel=require("../models/authorModel")
const publisherModel=require("../models/publishermodel")
//task-3
const createtBooksData= async function (req, res) {
    let Book=req.body
    let a_id=Book.author_id
    let p_id=Book.publisher_id
    let b =await authorModel.findOne({_id:a_id})
    let c= await publisherModel.findOne({_id:p_id})
    if(a_id&&p_id&&c&&b){
        let bookDeteils=await bookModel.create(Book)
        res.send({msg:bookDeteils})
    }else if(a_id==undefined){
        res.send("author ID is required")
    }else if(b==null){res.send("author is NOT present")
    }else if(p_id==undefined){
        res.send("publisher ID is required")
    }else{res.send("publisher is NOT present")}
}
 //task-4       
    
const getallBooks = async function (req, res) {
    let allBooks = await bookModel.find().populate('author_id').populate('publisher_id')
    res.send({data: allBooks})

}

module.exports.createtBooksData= createtBooksData              
module.exports.getallBooks= getallBooks
