const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Order = require('../models/orderModel').Order;

module.exports= function(app,server){
    app.use(bodyParser.json());
    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    // to show all orders from db
    app.get('/orders',(req,res)=>{

        Order.find({},function(err,data){
            
            if(err)
            console.log(err);
            else
            {
                res.render('orders',{data:data});   
            }
        });
    });

    //edit order form 

    app.get('/edit/:id',(req,res)=>{
        Order.find({orderNo:req.params.id},function(err,data){
            console.log(data);
            res.render('editorder',{data:data});
        });

    });    

    //post route to save updated data in db

    app.post('/edit/:id',(req,res)=>{
        //console.log(req.body);
        Order.findOneAndUpdate({orderNo:req.params.id}, { orderNo:req.params.id,
            placedBy:req.body.name ,
            phone:req.body.phone,
            email:req.body.email,
            title:req.body.title,
            price:req.body.price },{useFindAndModify: false},(err)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("sucessfully wrote");
            }
            res.redirect('/orders');
        });

        
        

    });    



    };