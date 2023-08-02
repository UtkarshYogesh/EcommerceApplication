import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { useState } from "react";
//import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useEffect } from "react";
import { loadCart } from "./helper/cardHelper";
import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";

const Cart=()=> {
 const [products,setproducts]=useState([]);
 const [reload,setReload]=useState(false);

 useEffect(()=>{
  let loadedProducts=loadCart();
  if(loadedProducts)
  {
    setproducts(loadCart())
  }
    
    console.log(products)
    console.log(products.length)
 },[reload])
 const loadAllProducts=(products)=>{
  console.log(products)
    return (
        <div>
            <h2>This section is to load product</h2>
            {products.map((product,index)=>{
                return (
                    <Card 
                    key={index}
                    product={product}
                    addtoCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}/>
                )
            })}
        </div>
    )
 }

 const loadCkeckout=()=>{
    return (
        <div>
            <h2>This section is to load checkout</h2>
        </div>
    )
 }

  return (
    <Base title="Cart Page">
      <div className="row text-center">
        <div className="col-6">
          <h3>{products.length}</h3>
          {products.length>0 ? 
        (loadAllProducts(products)):(
          <h3>No product in cart</h3>
        )}</div>
        <div className="col-6"><Paymentb products={products} setReload={setReload}/>
        </div>
          
        
      </div>
    </Base>
  );
}

export default Cart
