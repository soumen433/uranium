const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {
    publisher_name: String,
    HeadQuarater:String,
    
}, { timestamps: true });

module.exports = mongoose.model('PublisherDetails', publisherSchema)