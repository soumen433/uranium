const publisherModel=require("../models/publishermodel")
//task-2
const createPublisher=async function(req,res){
    let data=req.body
    let publisher=await publisherModel.create(data)
    res.send({msg:publisher})
}
module.exports.createPublisher=createPublisher                    