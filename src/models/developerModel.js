const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema( {
    name: String,
    size:Number,
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    persentage:Number,
    batch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"developers"
    }
   

}, { timestamps: true });

module.exports = mongoose.model('developers', developerSchema)