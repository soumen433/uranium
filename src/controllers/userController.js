const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

//Creating User Function

const createUser = async function (req, res) {
    let data = req.body


    if (Object.keys(data).length === 0) {
        return res.status(400).send({ status: false, message: "data must be required" })
    }

    //Validation On title
    if (!data.title) {
        return res.status(400).send({ status: false, message: "title is required" })
    }
    // Title should be in enum [ "Mr" , "Mrs" , "Miss"]
    if (data.title !== "Mr" && data.title !== "Mrs" && data.title !== "Miss") {
        return res.status(400).send({ status: false, message: "title should be  Mr,Mrs,Miss" })
    }
    if (!data.name) {
        return res.status(400).send({ status: false, message: "name is required" })
    }
    let Name = /^[A-Za-z ]{1,100}$/.test(data.name)
    if (!Name) return res.status(400).send({ status: false, msg: " Name should not be numeric" })



    //Validation on Phone Number

    if (!data.phone) {
        return res.status(400).send({ status: false, message: "phone is required" })
    }

    //Checking the validation on phone number
    let isValidPhone = /^[6-9]{1}[0-9]{9}$/
    if (!isValidPhone.test(data.phone)) {
        return res.status(400).send({ status: false, message: "Phone Number is not valid" })
    }

    //checking the uniqueness of a phone no. 
    let phoneNum = await userModel.findOne({ phone: data.phone })

    if (phoneNum) {
        if (phoneNum.phone === data.phone) {
            return res.status(400).send({ status: false, message: "Phone number already Exist" })
        }

    }


    //Validation On email
    if (!data.email) {
        return res.status(400).send({ status: false, message: "email is required" })
    }

    //Checking EMail Format
    let isValidEmail = /^[a-z0-9]{1,100}@[a-z]{1,50}[.]{1}[a-z]{2,3}$/
    if (!isValidEmail.test(data.email)) return res.status(400).send({ status: false, msg: "email not valid" })

    // Checking the uniqueness of email
    let checkEmail = await userModel.findOne({ email: data.email })

    if (checkEmail) {
        if (checkEmail.email === data.email) {
            return res.status(400).send({ status: false, message: "Email already Exist" })
        }

    }

    //Validation On password
    if (!data.password) {
        return res.status(400).send({ status: false, message: "password is required" })
    }

    //cheking the password length 

    let isValidPassword = /^[A-Za-z0-9@$#]{8,15}$/
    if (!isValidPassword.test(data.password)) {
        return res.status(400).send({ status: false, message: "password length should be Min 8 and max 15" })
    }


    let users = await userModel.create(data)
    res.status(201).send({ status: true, data: users })

}

//Login Function

const login = async function(req,res){
    let data = req.body
    if(Object.keys(data).length==0){ 
        return res.status(400).send({status:false , message:"Data must be given inside body" })
    }
let email = req.body.email
let password = req.body.password

let checkUser = await userModel.findOne({email:email , password : password})
if(!checkUser){
    return res.status(400).send({status:false , message:"Email or Password is not valid" })
}
let token = jwt.sign()


}




module.exports.login = login
module.exports.createUser = createUser