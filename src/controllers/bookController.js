const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savebook= await BookModel.create(data)
    res.send({msg: savebook})
}
//task 1
const Booklist= async function (req, res) {
 let allBooks=await BookModel.find().select({bookName:1,authorName:1,_id:0})
 res.send({msg:allBooks})
}
//task 2
const getBooksInyear=async function(req,res){
let year=req.body.year
    let booksInYear=await bookModel.find({year:year})
    res.send({msg:booksInYear})
}
//task 3
const particularBook= async function (req,res){
    let anyData=req.body
    let particular=await bookModel.find(anyData)
    res.send({msg:particular})
}
//task 4
const getXINRbooks=async function(req,res){
    let inrBook=await bookModel.find({"prices.indianPrice":{$in:["100INR","200INR","500INR"]}})
    res.send({msg:inrBook})
}
//task 5
const getRandomBooks=async function(req,res){
    let randomBook=await bookModel.find({$or:[{stockAvilable:true},{totalPages:{$gt:500}}]})
    res.send({mgg:randomBook})
}
   
module.exports.createBook= createBook
module.exports.Booklist=Booklist
module.exports.getBooksInyear=getBooksInyear
module.exports.particularBook=particularBook
module.exports.getXINRbooks=getXINRbooks
module.exports.getRandomBooks=getRandomBooks