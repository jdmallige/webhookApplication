const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const path=require('path');
const mongoose=require('mongoose');
const Order = require('./models/orderModel').Order;
const routes=require('./routes/routes');


// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.set('view engine','ejs');
app.use("/public",express.static(path.join(__dirname, 'public')));

//mondoDb

mongoose.connect('mongodb://jagdish123:jagdish123@ds219839.mlab.com:19839/cmsdb', { useUnifiedTopology: true, useNewUrlParser: true})
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
});



app.get('/',(req,res)=>{

    res.render('home.ejs')
});


app.post('/',(req,res)=>{
    var payload = JSON.stringify(req.body);
   console.log("hook received");
    //console.log(req.body);

    var newOrder=new Order({
        orderNo:req.body.id,
        placedBy:req.body.customer.first_name+req.body.customer.last_name ,
        phone:req.body.phone,
        email:req.body.email,
        title:req.body.line_items[0].title,
        price:req.body. line_items[0].price
    });

    newOrder.save().then(() => {
        console.log('saved in db')
    });
     
    res.sendStatus(200);

});


const server= app.listen(process.env.PORT||3000,()=>{
    console.log("server running at 3000");
});

routes(app,server);