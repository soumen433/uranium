const developerModel= require("../models/developerModel")
const batchModel= require("../models/batchesmodel")

//task-2
const createDeveloper= async function (req, res) {
    let developer = req.body
    let developerCreated = await developerModel.create(developer)
    res.send({data: developerCreated})
}
//task-3
const scholarshipDev=async function(req,res){
    let scholarship=await developerModel.find({gender:"female",persentage:{$gte:70}})
    res.send({msg:scholarship})
}
//task-4
const developer=async function(req,res){
    let per=req.query.percentage
    let pro=req.query.program
   let batchID=await batchModel.find({name:pro}).select({_id:1})
   let id=batchID[0]._id
    let result=await developerModel.find({batch:id,persentage:{$gte:per}})
    res.send({msg:result})
}

module.exports.createDeveloper= createDeveloper
module.exports.scholarshipDev=scholarshipDev
module.exports.developer=developer