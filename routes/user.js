const express=require('express');
const router=express.Router();


const {getUserById,getUser,getAllUser,updateUser,userPurchaseList} =require("../controllers/user");
const {isSignin,isAuthenticated,isAdmin}=require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignin,isAuthenticated,getUser);

router.get("/users",getAllUser);

router.put("/users/:userId",updateUser);

router.get("/order/user/:userId",userPurchaseList);

module.exports=router;