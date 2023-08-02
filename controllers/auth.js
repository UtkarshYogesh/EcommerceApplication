const User = require("../models/user.js");
const { query, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      err: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Not signup",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body; // taking email and password form form
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    // validation
    return res.status(422).json({
      err: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    // finding email in database
    if (err) {
      return res.status(400).json({
        error: "User email not found",
      });
    }
    if (!user) {
      return res.status(400).json({
        error: "Email is not register",
      });
    }

    // authentication password
    // const k=user.authenticate(encry_password);
    // console.log(k);
    if (!user.authenticate(password)) {
        //console.log(encry_password);
      return res.status(400).json({
        error: "Incorrect password",
      });
    }

    // creatting token
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // sending to frontend

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
  res.json({
    message: "User is signout",
  });
};

// protecte route

exports.isSignin=expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})

// custom middleware

exports.isAuthenticated=(req,res,next)=>{
  let checker=req.profile && req.auth && req.profile._id==req.auth._id;
  // console.log("hee")
  // console.log(req.profile);
  // console.log("hee")
  // console.log(req.auth);
  // console.log("hee")
  // console.log(req.profile._id==req.auth._id)
  if(!checker){
    //console.log(err);
    return res.status(400).json({
      error:"Access denied"
    })
  }
  next();
}

exports.isAdmin=(req,res,next)=>{
  if(req.profile.role===0)
  {
    return res.status(403).json({
      error:"You are not admin"
    })
  }
  next();
}
