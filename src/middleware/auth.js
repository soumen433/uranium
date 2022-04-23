const jwt=require("jsonwebtoken");
const mid1=async function(req,res,next){
    let header=req.headers;
    let token=header["x-auth-token"];
    if(!token) token=header["x-Auth-token"]    //handle upercase as well as lower case

    if(!token) return res.status(401).send({msg:"Sorry,Header Must Needed"})
  try{
    let decodedToken = jwt.verify(token, "functionup-uranium-soumen");
    let userId=req.params.userId;
    let logId=decodedToken.userId;
    if(userId!=logId) return res.status(407).send({msg:"logout,plz log-in first"});

   
  }
    catch(error){
        res.status(500).send({msg:error.message})
    }

    next()
}
module.exports.mid1=mid1