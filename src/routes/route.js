const express = require('express');
const router = express.Router();

const batchController=require("../controllers/batchController")
const developerController=require("../controllers/developerController")


router.post("/batches", batchController.createBatch  )

router.post("/developers", developerController.createDeveloper)

router.get("/scholarship-developer",developerController.scholarshipDev)

router.get("/developer",developerController.developer)

module.exports = router;