const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")

const authentication = async function(req,res,next){
    try{

    
    let token = req.headers["X-Api-Key"] || req.headers["x-api-key"] 
    
    if(!token){
        return res.status(400).send({status:false , message:"token must be present" })
    }
try{
    let decodedToken = jwt.verify(token,"group34")
    
}
catch(err){
    return res.status(403).send({status:false , message : "invalid token"})
}
req['x-api-key'] = token
next()
}
catch(err){
    return res.status(500).send(err.message)
}

}

//Creating authorization function
// const authorization = async function(req,res,next){
//  let    
// let token = req['x-api-key']
// let decodedToken = jwt.verify(token,"group34")
// //console.log(decodedToken);
// if(decodedToken.userId !==)
// }



module.exports.authentication = authentication
// module.exports.authorization = authorization