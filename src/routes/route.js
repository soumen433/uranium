const express = require('express'); 

const router = express.Router();
//problem-1
router.get('/movies', function (req, res) {
    let moviesList=["rang de basanti","KGF","PUSHPA","THE shining","lord of the ring","Don",]
    let a=[]

    for(i=0;i<moviesList.length;i++){
        a+=moviesList[i]+','
    }
    res.send(a)
});
//problem-2 && problem-3
router.get('/movies/:number', function (req, res) {
    let moviesList=["rang de basanti","KGF","PUSHPA","THE shining","lord of the ring","Don"]
    let i=req.params.number
     if (i<=moviesList.length-1){
res.send(moviesList[i])}
    else{
    res.send('use a valid index') 
    }
});

//problem-4
router.get('/films', function (req, res) {
    let moviesList=[{"id":1,"name":"the shining"},{"id":2,"name":"incendies"},{"id":3,"name":"rang de basanti"},{"id":4,"name":"finding nemo"}]

    res.send(moviesList)
});
//problem -5
router.get('/films/:filmid', function (req, res) {
    let moviesList=[{"id":1,"name":"the shining"},{"id":2,"name":"incendies"},{"id":3,"name":"rang de basanti"},{"id":4,"name":"finding nemo"}]
    let a=req.params.filmid-1
if(a<=moviesList.length-1){
    res.send(moviesList[a])
  }
else{
    res.send('no movie exixt with this id')
    } 
});
// write an API which gives the missing number in an array of integers starting from 1...
router.get('/missing1', function (req, res) {
let a=[1,2,3,5,6,7,8,9]
let total = 0;
for (var i in a){
   total +=a[i]
}
let lastN=a.pop()
let sumOfall=lastN * (lastN +1) / 2
let missN=sumOfall - total

res.send({missing:missN})

});
//write an aPI  which gives the missing number in an array of integers starting from aNYwhere...
router.get('/missing2', function (req, res) {
    let a=[67,68,69,70,72,73]
    let len=a.length
    let total=0
    for(var i in a){
       total +=a[i]
    }
    let fast=a[0]
    let last=a.pop()
    let sumOfall= (len +1) * (fast+last)/2
    let miss=sumOfall - total
    res.send({missnum:miss})
});
let players =[{"name":"soumen","gen":"male","age":"24"},
{"name":"maity","gen":"female","age":"56"},
{"name":"valo","gen":"male","age":"23"},]
router.post('/players',function(req,res){
    let data1=req.body.name
for(let i=0;i<players.length;i++){
    if(players[i].name===data1){
        res.send({data: players ,status:true})
    }
}
let data2=req.body
players.push(...data2)
    res.send({data:players,status:false})
}),
module.exports = router;
// adding this comment for no reason