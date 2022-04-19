const batchModel= require("../models/batchesmodel")

//task-1
const createBatch= async function (req, res) {
    let batch = req.body
    let batchCreated = await batchModel.create(batch)
    res.send({data:batchCreated})
}

module.exports.createBatch= createBatch
