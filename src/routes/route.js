const express = require('express');
const loadash=require("lodash")
const logger = require('../logger/loggar')
const helper=require("../util/helper");
const formatter=require("../validator/formatter")
const router = express.Router();

router.get('/test-me', function (req, res) {
    helper.currentDate()
   helper.currentmonth()
    helper.betchinfo()
    logger.welcome()
    formatter.Trim()
    formatter.changelow()
    formatter.changeup()
    res.send('My first ever api!')
});
router.get('/hello', function (req, res) {
    let month=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
    let subArray=loadash.chunk(month,3)
    console.log(subArray)
    let num=[1,3,5,7,9,11,13,15,17,19]
    let result=loadash.tail(num)
    console.log(result)
    let a=[1,4,6]
    let b=[5,7,2]
    let c=[3,2,1]
    let d=[4,9,2]
    let e=[5,9,3]
    let marArr=loadash.union(a,b,c,d,e)
    console.log(marArr)
    let a1=["horror","the shining"]
    let b1=["drama","titanic"]
    let c1=["thriller","shutter island"]
    let d1=["fantasy","pans labyrinth"]
    let pair=loadash.fromPairs([a1,b1,c1,d1])
    console.log(pair)
    res.send('My hello ever api!')
});


module.exports = router;
// adding this comment for no reason