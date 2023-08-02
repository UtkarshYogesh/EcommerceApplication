const { escape } = require("lodash");
const {ProductCart,Order}=require("../models/order");

exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exxec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Order not found"
            })
        }
        req.order=order;
        res.json(order);
        next();
    })
}

exports.createOrder=(req,res)=>{
     req.body.order.user=req.profile;
     const order=new Order(req.body.order);

     order.save((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Order not created"
            })
        }
        res.json(order);
     })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .ecec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Order not present in db"
            })
        }
        res.json(order);
    })
}

exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus=(req,res)=>{
    Order.updateOne(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err)
            {
                return res.status(400).json({
                    eror:"Cannot update order status"
                }
                    )
            }
            res.json(order);
        }
    )
}