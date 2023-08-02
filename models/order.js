const { string } = require('i/lib/util');
const mongoose=require('mongoose');

const {ObjectId}=mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number
});

const OrderSchema=new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    status:{
        type:String,
        defalt:"",
        enum:["Cancelled","Delivered","Shipped","Processing","Revieved"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    
    }

});

const ProductCart =mongoose.model("Productcart",ProductCartSchema);
const Order=mongoose.model("Order",OrderSchema);

module.exports={ProductCart,Order};