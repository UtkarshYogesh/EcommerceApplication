require('dotenv').config()
const mongoose=require('mongoose');
const express=require('express');

const app=express();

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');

// myroutes
const authRoutes=require("./routes/auth.js");
const userRoutes=require("./routes/user.js");
const categoryRoutes=require("./routes/category.js");
const productRoutes=require("./routes/product.js");
const orderRoutes=require("./routes/order.js");
const stripeRoutes=require("./routes/stripepayment.js");
const authR=require("./routes/auth.js");
const paymentBRoutes=require("./routes/paymentBRoutes.js");


// DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(()=>{
    console.log("mongo ic connected");
}).catch(()=>{
    console.log("Disconnected");
});


//fun().run().then().catch(); this is how function is handled first it is declare tha is fun(), then some method run(),then()will run if funtion is successful and catch()will run when runtion is fail

//const port=8000;

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
//app.use("/api",authR);
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);
app.use("/api",paymentBRoutes);


// port
const port=process.env.PORT || 8000;

// server connection
app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})
