const mongoose=require('mongoose');
const crypto=require('crypto');
//import { v1 as uuidv1 } from 'uuid';
const uuidv1=require('uuid/v1');
// const { Schema } = mongoose;

var userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:10,
        trim:true

    },
    lastname:{
        type: String,
        maxlength:10,
        trim: true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo: {
        type:String,
        trim:true

    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type:Number,
        default: 0
    },
    purchases: {
        type:Array,
        default:[]
    }

},{timestamps:true});

// createing virtual field
// set will set encry_password from plain password
userSchema.virtual("password")
    .set(function(password){
         this._password=password;
         this.salt=uuidv1();
         this.encry_password=this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods={

    authenticate:function(plainpassword){
        const pass=this.securePassword(plainpassword);
        console.log(pass);
        console.log("abc")
        console.log(plainpassword);
       
        return this.securePassword(plainpassword)===this.encry_password;
    },

    securePassword:function(plainpassword){
        if(!plainpassword) return "";

        try {
            // console.log(plainpassword+" "+crypto.createHmac('sha256', this.salt)
            // .update(plainpassword)
            // .digest("hex"));
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest("hex");
            
        } catch (err) {
            return "";
        }
    }
    // secure password method convert the plain password into hashpassword
}
module.exports=mongoose.model("User",userSchema);

