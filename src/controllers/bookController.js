const bookModel= require("../models/bookmodel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const getbookData= async function (req, res) {
    let allbooks= await bookModel.find()
    res.send({msg: allbooks})
}

module.exports.createBook= createBook
module.exports.getbooksData= getbookData