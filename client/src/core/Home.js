import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { useState } from "react";
//import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useEffect } from "react";

export default function Home() {
 const [products,setProducts]=useState([]);
 const [error,setError]=useState("");
const losdAllProducts=()=>{
  getProducts().then(data=>{
    if(data.error)
    {
      setError(data.error);    
    }
    else
    {
      setProducts(data);
    }
  })
}

useEffect(()=>{
  losdAllProducts()
},[])
  return (
    <Base title="Home Page">
      <div className="row text-center">
        <h1 className="text-white">All Products</h1>
        <div className="row">
        {products.map((product,index)=>{
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={product}/>
            </div>
          )
        })}
        </div>
        
          
        
      </div>
    </Base>
  );
}

