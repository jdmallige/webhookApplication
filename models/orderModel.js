const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    
    orderNo: {
        type: Number,
        required: true
    },
    
    placedBy: {
        type: String,
        required:true
    },
    
    phone: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    
            
});    
    


module.exports = {Order: mongoose.model('order', OrderSchema )};
