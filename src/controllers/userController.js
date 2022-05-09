const userModel = require("../models/userModel")

const createUser = async function(req,res){
let data= req.body
let title  = data.title

if(Object.keys(data).length === 0){
    return res.status(400).send({status:false, message :"data must be required"})
}
if(!data.title){
    return res.status(400).send({status:false, message :"title is required"}) 
}
console.log(title)
// if(title !== "Mr" && title !== "Mrs" &&  title !=="Miss"){
//     return res.status(400).send({status:false, message :"title should be  Mr,Mrs,Miss"}) 
// }
if(!data.name){
    return res.status(400).send({status:false, message :"name is required"}) 
}
if(!data.phone){
    return res.status(400).send({status:false, message :"phone is required"}) 
}
if(!data.email){
    return res.status(400).send({status:false, message :"email is required"}) 
}
if(!data.password){
    return res.status(400).send({status:false, message :"password is required"}) 
}



let users = await userModel.create(data)

}


module.exports.createUser=createUser