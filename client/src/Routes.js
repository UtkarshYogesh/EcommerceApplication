import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup"
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct"
import ManageProducts from "./admin/ManageProducts";
import UpdateCategory from "./admin/UpdateCategory"
import { updateCategories, updateProduct } from "./admin/helper/adminapicall";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
        <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
        <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
        <AdminRoute path="/admin/categories/update/:categoryId" exact component={UpdateCategory}/>

        <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
        <AdminRoute path="/admin/products" exact component={ManageProducts}/>
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
