const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  let data = abcd.body;
  if(Object.keys(data).length==0) return res.status(400).send({msg:"Plz provide your details"})
  let savedData = await userModel.create(data);
  xyz.status(201).send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
  if(!userName) return res.status(400).send({msg:"Plz enter your emailId"})
  if(!password) return res.status(400).send({msg:"Plz enter your password"})
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(407).send({
      status: false,
      msg: "username or the password is not corerct",
    });
    // create Token
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "uranium",
      organisation: "FUnctionUp",
    },
    "functionup-uranium-soumen"
  );
  //res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let a=userId.toString()
  let userDetails = await userModel.findById(a);
  res.status(200).send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
 try{
  let userId = req.params.userId;
  let userData = req.body;
  if(Object.keys(userData).length==0) return res.status(400).send({msg:"Plz put your data"})
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.send({ status:true, data: updatedUser });}
 
catch(error){
    req.status(500).send({msg:err.message })
  }
};


const deleteUser=async function (req,res){
  try{
  let userId = req.params.userId;
  let user = await userModel.findOneAndUpdate({_id:userId},{isDeleted:true},{new:true});
  res.send({msg:user})
  }
  catch(error){ 
    req.status(401).send({msg:"Put your correct userID"})}

}



////////////////////////


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser=deleteUser
