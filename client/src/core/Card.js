import React from 'react'
import ImageHelper from './ImageHelper';
import { useState } from 'react';
import { addItemToCart, removeItemFromCart } from './helper/cardHelper';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { isAuthenticated } from '../auth/helper';

const Card = ({product ,
  addtoCart=true,
  removeFromCart=false,
  setReload=f=>f, //function(f)return f;
  reload=undefined
}) => {
const [redirect,setRedirect]=useState(false);
const [count,setCount]=useState(product.count);
  const cardtitle = product ? product.name:"Dafault name";
  const cardDescription = product ? product.description:"Dafault name";
  const cardPrice = product ? product.price:"Dafault name";
  const userId=isAuthenticated() && isAuthenticated()._id
const addToCart=()=>{
  if(isAuthenticated())
  {
    addItemToCart(product,()=>setRedirect(true));
  }
  else
  {
    alert("Please login to add items in cart")
  }
  
}

const getaRedirct=(redirect)=>{
  if(redirect)
  {
    return <Redirect to="/cart"/>
  }
}
  
  
  
  
  const showAddtoCart=(addtoCart)=>{
    return (
      addtoCart && (<button
        onClick={addToCart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>)
    )
  }

  const showRemoveFromCart=(removeFromCart)=>{
    return (
      removeFromCart && (<button
                onClick={() => {removeItemFromCart(product._id);
                setReload(!reload) }
              }
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>)
    )
  }
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardtitle}</div>
        <div className="card-body">
          {getaRedirct(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
          <div className="row text-centre">
            <div className="col-12">
              {showAddtoCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;