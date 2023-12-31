import React, { useState } from 'react'
import {Link , Redirect} from "react-router-dom";
import Base from '../core/Base';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

export default function Signin() {

  const [values,setValues]=useState({
    email:"",
    password:"",
    error:"",
    loading:false,
    didRedirect:false
  })

  const {email,password,error,loading,didRedirect}=values;

  const {user}=isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false,loading:true });
    signin({  email, password })
      .then((data) => {
        console.log(data.error);
        if (data.error) {
          setValues({ ...values, error: data.error, loading:false });
        } else {
           authenticate(data,()=>{
            setValues({
              ...values,
              didRedirect:true
            })
           })
        }
      })
      .catch(console.log("Error in signin"));
  };

  const performRedirect=()=>{
    if(didRedirect)
    {
      if(user && user.role===1)
      {
        return <Redirect to="/admin/dashboard"/>
      }
      else
      {
        return <Redirect to="/user/dashboard"/>
      }
    }
    // if(isAuthenticated()){
    //   return <Redirect to="/"/>
    // }
  }

    const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input onChange={handleChange("email")} value={email} className="form-control" type="email" />
                </div>
    
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input onChange={handleChange("password")} value={password} className="form-control" type="password" />
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
              </form>
            </div>
          </div>
        );
      };

      const loadingMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
    
              <div className="alert alert-success" style={{display:loading?"":"none"}}>
               Loading
              </div>
            </div>
          </div>
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
    
              <div className="alert alert-success" style={{display:error?"":"none"}}>
                {error}
              </div>
            </div>
          </div>
        );
      };
  return (
    <Base title='SignIn Page' description='User wll sign in here'>
       {loadingMessage()}
       {errorMessage()}
       {signInForm()}
       
       
       <p>{JSON.stringify(values)}</p>

       <p>{JSON.stringify(user)}</p>
       {performRedirect()}
    </Base>
  )
}
