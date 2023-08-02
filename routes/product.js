const express=require('express');
const router=express.Router();

const {getAllProduct,getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllUniqueCategories}=require("../controllers/product");
const {getCategoryById,createCategory,getCategory,getAllcategory,updateCategory,removeCategory}=require("../controllers/category");
const {getUserById,getUser,getAllUser,updateUser,userPurchaseList} =require("../controllers/user");
const {isSignin,isAuthenticated,isAdmin}=require("../controllers/auth");

//param router
router.param("userId",getUserById);
router.param("productId",getProductById);

// actual routes
router.post("/product/create/:userId",createProduct);

router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

router.delete("/product/:productId/:userId",isSignin,isAuthenticated,isAdmin,deleteProduct);

router.put("/product/:productId/:userId",isSignin,isAuthenticated,isAdmin,updateProduct);

// listing route

router.get("/products",getAllProduct);

router.get("/products/categories",getAllUniqueCategories)



module.exports=router;