const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    BookName: {
        type: String,
        unique:true,
    },
    authorName: String,
    catagory: String, 
    year: String
  },{timestamps: true });

module.exports = mongoose.model('book', bookSchema) 




