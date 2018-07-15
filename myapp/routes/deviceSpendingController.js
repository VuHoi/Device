


var spending =require('../models/device-spending')


module.exports = function(app)
{


// http get
    app.get('/api/spending', (req, res) => {
        spending.find({}).then(item=>{
            res.send(item);
        })

    });
//http post
    app.post('/api/spending',(req,res)=>{
        var Spending=req.body;

        spending.create(Device) .then(() => {
            res.json(Spending)
        })
            .catch((err) => {
                res.json(err)
            })





    })

//http put
    app.put('/api/spending/:id',(req,res)=>{
        var id = mongoose.Types.ObjectId(req.params.id);
        spending.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, spending) {

            if (err)

                res.send(err);

            res.json(spending);

        });

    })






// http delete
    app.delete('/api/spending/:id',(req,res)=>{
        var id = mongoose.Types.ObjectId(req.params.id);
        spending.remove({_id:id},(err,result)=>{
            if (err)

                res.send(err);

            res.json({_id:id});
        });
    });




}