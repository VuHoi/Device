var mongoose = require('mongoose');

module.exports= mongoose.model('divice',{
    name:{type: String, required: true},
    image :
         {
            title:{type: String, required: true},
            url:{type: String, required: true}
         }
    ,
    category:[String],
    location:{type: String, required: false},
    quantity:{type: Number, required: false},
    detail:{type: String, required: false},

   });