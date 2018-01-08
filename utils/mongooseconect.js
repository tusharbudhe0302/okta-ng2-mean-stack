const mongoose = require('mongoose');
// connect to database
module.exports.connectmongodb = function(){
mongoose.connect('mongodb://localhost:27017/oktaposts')
.then((connection) => { console.log('mongoodb connection estabilish!') })
.catch((error) => { console.log('mongodb connection error : ' + error) });
}