let date=function(){
    let currentDate = new Date()
    console.log("the current date is",currentDate)
}
let month=function(){
    let currentDate = new Date()
    console.log("the current month is:",currentDate.getMonth() +1)
}
let info=function(){
    console.log(" 'Uranium,W2D3,the topic for today is Nodejs module system")
}

module.exports.currentDate=date
module.exports.currentmonth=month
module.exports.betchinfo=info