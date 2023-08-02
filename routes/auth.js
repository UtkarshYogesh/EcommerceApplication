const express = require('express')
const router = express.Router()
const {signout,signup,signin, isSignin}=require("../controllers/auth");
const { check, validationResult } = require('express-validator');
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
//   })

// const signout=(req,res)=>{
//     res.json({
//         message:"User is signout"
//     })
// }
router.post("/signup",[
    check("name","Length grater than 2").isLength({min:2}),
    check("email","enter correct email").isEmail(),
    check("password","greater than 4").isLength({min:4})
],signup);

router.post("/signin",[
   
    check("email","enter correct email").isEmail(),
    check("password","greater than 4").isLength({min:4})
],signin);


router.get("/signout",signout)

router.get("/sig",(req,res)=>{
    res.send("hello")
})
router.get("/testroute",isSignin,(req,res)=>{
    res.send("Protected")
})
module.exports=router;