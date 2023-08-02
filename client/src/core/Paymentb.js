import React ,{useState,useEffect}from 'react'
import { loadCart,cartEmpty } from './helper/cardHelper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { getmeToken, processPayment } from './helper/paymentBhelper'
import { createOrder } from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'

const Paymentb=({
    products,
    setReload=f=>f,
    reload=undefined
})=> {
    const [info,setInfo]=useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    })

    const userId=isAuthenticated() && isAuthenticated().user._id
    const token=isAuthenticated()&& isAuthenticated().token

    const getToken=(userId,token)=>{
        console.log("hello")
        getmeToken(userId,token).then(info=>{
            console.log("Info",info);
            if(info.error)
            {
                setInfo({...info,error:info.error});
            }else
            {
                const clientToken=info.clientToken;
               setInfo({clientToken})
            }
        })
    }

    const showbtndropIn=()=>{
        return(
            <div>
                {info.clientToken!==null && products.length>0 ?(
                    <div>
                        <DropIn 
                        options={{authorization:info.clientToken}}
                        onInstance={instance=>(info.instance=instance)}
                        />
                        <button className="btn btn-block btn-success "onClick={()=>{onPurchase()}}>Buy</button>
                    </div>
                ):(<h3>Please Login</h3>)}
            </div>
        )
    }

    useEffect(()=>{
        //console.log("hell")
        getToken(userId,token)
    },[])

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              //TODO: empty the cart
              //TODO: force reload
              const orderData={
                products:products,
                transaction_id:response.transaction_id,
                amount:response.transaction.amount
              }
              createOrder(userId,token,orderData);
              cartEmpty(()=>{
                console.log("did we got a crash");
              })

              setReload(!reload)
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount;
      };
    
    
    



  return (
    <div>
      <h1>Your Bill is {getAmount()}$</h1>
      {showbtndropIn()}
    </div>
  )
}
export default Paymentb