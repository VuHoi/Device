

var jwt    = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;





var user =require('../models/user')

  
module.exports = function(app)
{


// http get
      app.get('/api/user', (req, res) => {

        user.find({}).then(item=>{
            res.send(item);
          })
        
      });
//http post
      app.post('/api/user',(req,res)=>{
          var User=req.body;
          bcrypt.hash(User.password, saltRounds, function(err, hash) {
            User.password = hash;
          });
          setTimeout(()=>{
           user.create(User) .then(() => {
               res.json(User);
               if (error) {
                   return next(error);
               } else {

                   req.cookies.userId = user._id;

               }

            })
            .catch((err) => {
              res.json(err)
            })
          },100)
          //nn
         
       
        
      })

//http put
app.put('/api/user/:id',(req,res)=>{
  var id = mongoose.Types.ObjectId(req.params.id);
  user.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, product) {

    if (err)

      res.send(err);

    res.json(user);

  });

})






// http delete
app.delete('/api/user/:id',(req,res)=>{
  var id = mongoose.Types.ObjectId(req.params.id);
  user.remove({_id:id},(err,result)=>{
    if (err)

      res.send(err);

    res.json({_id:id});
  })
})



// login
app.post('/login',(req,res)=>{
  var User=req.body;

    user.authenticate(User.email, User.password, function (error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            res.send(err);
            // return next(err);
        } else {

            const payload = {
                user: user
            };

            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn : 1440
            });


            res.send({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });

 //https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

            // var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImltYWdlIjp7Im5hbWUiOiJtaWNyb3Bob25lIiwidXJsIjoibG9yZW00MDB4NDAwLmNvbSJ9LCJfaWQiOiI1YjQ4NGFlNDRlY2NkZTE4ODg0MTQxNjMiLCJ1c2VybmFtZSI6IkhvaSBkZXAgdHJhaSIsInBhc3N3b3JkIjoiJDJiJDEwJGM2RHllN3JreHN6VjE4dC9hY3B3VU9sWGtvZjFyRzZ3ZVhsc1lVam5ZalFWS3RUMmc3Q011IiwiZW1haWwiOiIxMTExMTExMTExMTExMTExMSIsImRlcGFydG1lbnQiOiJURlQiLCJob21ldG93biI6ImxhbSBkb25nIiwiaWRlbnRpdHlfbnVtYmVyIjoiMjUxMDM1OTk2Iiwicm9sZSI6InVzZXIiLCJkZXZpY2UiOlt7ImltYWdlIjp7Im5hbWUiOiJtaWNyb3Bob25lIiwidXJsIjoibG9yZW00MDB4NDAwLmNvbSJ9LCJfaWQiOiI1YjQ4NGFlNDRlY2NkZTE4ODg0MTQxNjUiLCJuYW1lIjoiVGVsZXBob25lIiwiYm9ycm93ZWRfZGF5IjoiMjAxOC0yLTIiLCJlbnBpcmVkX2RheSI6IjIwMTgtMy0zIn0seyJpbWFnZSI6eyJuYW1lIjoibWljcm9waG9uZSIsInVybCI6ImxvcmVtNDAweDQwMC5jb20ifSwiX2lkIjoiNWI0ODRhZTQ0ZWNjZGUxODg4NDE0MTY0IiwibmFtZSI6IkNlbGwgUGhvbmUiLCJib3Jyb3dlZF9kYXkiOiIyMDE4LTItMiIsImVucGlyZWRfZGF5IjoiMjAxOC0zLTMifV0sIl9fdiI6MH0sImlhdCI6MTUzMTY2Mjg3MywiZXhwIjoxNTMxNjY0MzEzfQ.duxJ83CImpXDeNR_1vjL-_0pUZUe1UvOMqOsIZxWN9A";
            // jwt.verify(token, app.get('superSecret'), function(err, decoded){
            //     console.log(decoded);
            // });
            // res.send(user._id);
            // req.cookies.userId = user._id;

        }
    });

 


})

//get user by token
    app.get('/api/user/:token',(req,res)=>{
        var token = req.params.token;
        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            res.send(decoded);
        });
    })


// GET for logout logout
    app.get('/logout', function (req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.send("Successful");
                }
            });
        }
    });

}