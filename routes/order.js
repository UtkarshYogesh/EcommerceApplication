const express=require('express');
const router=express.Router();

const {getAllProduct,updateStock}=require("../controllers/product");
const {getCategoryById,createCategory,getCategory,getAllcategory,updateCategory,removeCategory}=require("../controllers/category");
const {getUserById,pushOrderInPurchaseList,getUser,getAllUser,updateUser,userPurchaseList} =require("../controllers/user");
const {isSignin,isAuthenticated,isAdmin}=require("../controllers/auth");
const { getOrderById ,createOrder, getAllOrders,getOrderStats, getOrderStatus,updateStatus}=require("../controllers/order");
const { route } = require('./auth');

//param
router.param("userId",getUserById);
router.param("orderId",getOrderById);

router.post("/order/create/:userId",isSignin,isAuthenticated,
pushOrderInPurchaseList,updateStock,createOrder)

router.get("order/all/:userId",isSignin,isAuthenticated,isAdmin,getAllOrders)

router.get("/order/status/:userId",isSignin,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignin,isAuthenticated,isAdmin,updateStatus)

module.exports=router;