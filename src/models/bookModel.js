const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{ type: String, required:true},
        
    authorName: String, 
    tags: [String],
    year:{ type:Number, default: 2021},

    
    stockAvailable: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    totalPages:Number,
}, { timestamps: true });


module.exports = mongoose.model('Book2', bookSchema) //users



