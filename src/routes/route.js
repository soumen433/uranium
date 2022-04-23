const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth=require("../middleware/auth")

router.get("/test",function(req,res){res.status(400).send({msg:"hii"})})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",auth.mid1,userController.getUserData)

router.put("/users/:userId",auth.mid1, userController.updateUser)

router.delete("/users/:userId",auth.mid1,userController.deleteUser)

module.exports = router;