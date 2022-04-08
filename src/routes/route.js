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
        "name": "manis",
        "dob": "1/1/1995",
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
    let getName = req.body.number
    for(let i=0;i<players.length;i++){
          if(players[i].name===getName){
              res.send({data:players,status:true})
          }

    }
    let a=req.body
    players={...players,...a}
    res.send({data:players,status:true})
});

module.exports = router;
// adding this comment for no reason