var mongoose = require('mongoose');
var STATUS = require('./enum.js')
module.exports= mongoose.model('spending-divice',{

    username:{type: String, required: true, maxLength: 30,minLength:3},
    devices:[
        {
            name:{type: String, required: true},
            quantity:{type: Number, required: true}
        },
    ],
    status:{type: String,default:STATUS.SPENDING, required: true},
    time:Date
   });