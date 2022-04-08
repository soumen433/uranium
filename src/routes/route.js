const express = require('express');
const logger = require('./logger')

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
module.exports = router;
// adding this comment for no reason