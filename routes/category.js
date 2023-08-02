const express=require('express');
const router=express.Router();

const {getCategoryById,createCategory,getCategory,getAllcategory,updateCategory,removeCategory}=require("../controllers/category");
const {getUserById,getUser,getAllUser,updateUser,userPurchaseList} =require("../controllers/user");
const {isSignin,isAuthenticated,isAdmin}=require("../controllers/auth");

//param route
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual route

//create
router.post("/category/create/:userId",isSignin,isAuthenticated,isAdmin,createCategory);
//read
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllcategory);
//update
router.put("/category/:categoryId/:userId",isSignin,isAuthenticated,isAdmin,updateCategory);
//delete
router.delete("/category/:categoryId/:userId",isSignin,isAuthenticated,isAdmin,removeCategory);

module.exports=router;