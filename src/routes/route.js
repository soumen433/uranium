const express = require('express'); 

const router = express.Router();
let players=[
  {
      "name": "manis",
      "dob": "1/1/1995",
      "gender": "male",
      "city" : "jalandar",
      "sports": [
          "swimming"
      ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city" : "jalandar",
        "sports": [
            "swimming"
        ]

    },
    {
        "name": "lokesh",
      "dob": "1/1/1990",
      "gender": "male",
      "city" : "mumbai",
      "sports": [
          "soccer"
      ]
    },
]
router.post('/players', function (req, res) {
    let getName = req.body.name
    let fun1=function(getName){
    for(let i=0;i<players.length;i++){
        let b=players[i]
          if(b.name===getName){
              return true
          }

    }
    return false
}
    if(fun1(getName)===true){
        res.send({data:players,status:false})
    }else{
        let a=req.body
    let p={...players,...a}
    res.send({data:p,status:true})}
});

module.exports = router;
// adding this comment for no reason