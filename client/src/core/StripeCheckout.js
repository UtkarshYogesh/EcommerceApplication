// import React, { useState, useEffect } from "react";
// import { isAuthenticated } from "../auth/helper";
// //import { cartEmpty, loadCart } from "./helper/cartHelper";
// import { Link } from "react-router-dom";
// import StripeCheckoutButton from "react-stripe-checkout";
// import { API } from "../backend";
// import { createOrder } from "./helper/orderHelper";
// import { cartEmpty } from "./helper/cardHelper";

// const StripeCheckout = ({
//   products,
//   setReload = f => f,
//   reload = undefined
// }) => {
//   const [data, setData] = useState({
//     loading: false,
//     success: false,
//     error: "",
//     address: ""
//   });

//   const token = isAuthenticated() && isAuthenticated().token;
//   const userId = isAuthenticated() && isAuthenticated().user._id;

  

//   const makePayment = token => {
//     const body = {
//       token,
//       products
//     };
//     const headers = {
//       "Content-Type": "application/json"
//     };
//     return fetch(`${API}/stripepayment`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body)
//     })
//       .then(response => {
//         console.log(response)
//         //call further methods
//         const {status} =response;
//         console.log("sttus",status);
//         cartEmpty();
//       })
//       .catch(error => console.log(error));
//   };

//   const showStripeButton = () => {
//     console.log("hello")
//     return isAuthenticated() ? (
//       <StripeCheckoutButton
//         stripeKey="pk_test_51NRi7zSIhElUeFk9suXITMPSbxZ7nWsLw2X6ouRmpnCu2xUzZBMUutkpTistHClT67U0oY1NUMc9vFQmkI6DcqYq00BTj5Icff"
//         token={makePayment}
//         amount={getFinalAmount() * 100}
//         billingAddress
//         shippingAddress
//         name="Buy Tshirts"
//       >
//         <button className="btn btn-success">Pay with stripe</button>
//       </StripeCheckoutButton>
//     ) : (
//       <Link to="/signin">
//         <button className="btn btn-warning">Signin</button>
//       </Link>
//     );
//   };

//   return (
    
//     <div>
      
//       <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
//       {showStripeButton()}
//     </div>
//   );
// };

// export default StripeCheckout;
