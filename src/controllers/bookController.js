const bookModel = require("../models/bookModel")
const moment = require('moment')


const createBook = async function(req,res){
    try{
    data = req.body

    //Check if Body is empty or not 
    if (Object.keys(data).length === 0) {
        return res.status(400).send({ status: false, message: "data must be required" })
    }
    if (!data.title) {
        return res.status(400).send({ status: false, message: "title is required" })
    }
    if (!data.excerpt) {
        return res.status(400).send({ status: false, message: "excerpt is required" })
    }
    if (!data.userId) {
        return res.status(400).send({ status: false, message: "userId is required" })
    }
    if (!data.ISBN) {
        return res.status(400).send({ status: false, message: "ISBN is required" })
    }
    if (!data.category) {
        return res.status(400).send({ status: false, message: "category is required" })
    }
    if (!data.subcategory) {
        return res.status(400).send({ status: false, message: "subcategory is required" })
    }

    let books = await bookModel.create(data)
    
    res.status(201).send({ status: true, message: "success", data: books })


}
catch (err) {
    res.status(500).send({Satus: false, msg: "Error", error: err.message })
}
}





module.exports.createBook = createBook

