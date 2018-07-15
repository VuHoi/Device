

// var mongoose = require('mongoose');
// var dbConfig=require('../models/db');
//
//
//
// mongoose.connect(dbConfig.url);
//
// const Schema = mongoose.Schema;
// var db = mongoose.connection;
var device =require('../models/device')


module.exports = function(app)
{


// http get
    app.get('/api/device', (req, res) => {
        device.find({}).then(item=>{
            res.send(item);
        })

    });
//http post
    app.post('/api/device',(req,res)=>{
        var Device=req.body;

            device.create(Device) .then(() => {
                res.json(Device)
            })
                .catch((err) => {
                    res.json(err)
                })





    })

//http put
    app.put('/api/device/:id',(req,res)=>{
        var id = mongoose.Types.ObjectId(req.params.id);
        device.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, device) {

            if (err)

                res.send(err);

            res.json(device);

        });

    })






// http delete
    app.delete('/api/device/:id',(req,res)=>{
        var id = mongoose.Types.ObjectId(req.params.id);
        device.remove({_id:id},(err,result)=>{
            if (err)

                res.send(err);

            res.json({_id:id});
        });
    });




}