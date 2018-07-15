
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');
const saltRounds = 10;

const schema = mongoose.Schema;


var userSchema = new schema({

    username:{type: String,unique:true, required: true, maxLength: 30,minLength: 3},
    password:{type: String, required: true},
    email:{type: String, required: true,trim: true ,unique:true,format: 'email'},
    department:{type: String, required: false},
    hometown:{type: String, required: false},
    identity_number:{type: String, required: true ,unique:true},
    image:{
        name:{type: String, required: false},
        url:{type: String, required: false},
    },
    role:{type: String, required: true},
    device : [{
        name:{type: String, required: true},
        image:{
            name:{type: String, required: true},
            url:{type: String, required: true}
        },
        borrowed_day:{type: String, required: true},
        enpired_day:{type: String, required: true}
    }]
});

userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

// userSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, saltRounds, function(err, hash) {
//         user.password = hash;
//       });
//
//     next();
// });


var User = mongoose.model('User', userSchema);
module.exports= User;