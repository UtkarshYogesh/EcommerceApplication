const Category=require("../models/category");
const formidable = require("formidable");
const _ = require("lodash");

exports.getCategoryById=(req,res,next,id)=>{
    console.log("cate id: "+id);
    Category.findById(id).exec((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Category id not found"
            })
        }
        req.category=cate;
       //res.json(cate);
       console.log(req.category)
        next();
    })
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body);
    //console.log(req.body)
    category.save((err,cate)=>{
        if(err)
        {
            console.log(err);
            return res.status(400).json({
                error:"category is not created"
            })
        }
        res.json({cate});
    })
}

exports.getCategory=(req,res)=>{
    return res.json(req.category);
}

exports.getAllcategory=(req,res)=>{
    Category.find().exec((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                error:"No category present in db"
            })
        }
        return res.json(cate);
    })
}

// exports.updateCategory=(req,res)=>{
//     let category=req.category;
//     console.log("body",req.body);
//     category=req.body;
//     category.save((err,updatedCategory)=>{
//         if(err)
//         {
//             console.log(err)
//             return res.status(400).json({
//                 error:"No category present in db"
//             })
//         }
//         console.log("new");
//         console.log(updatedCategory)
//         res.json(updatedCategory);
//     })
// }
exports.updateCategory=(req,res)=>{
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        {
          $set: req.body,
        },
        { new: true, useFindAndModify: false },
        (err, cate) => {
          if (err || !cate) {
            return res.status(400).json({
              error: "not able to update"
            });
          }
        //   user.salt=undefined;
        //   user.encry_password=undefined;
        console.log(cate)
          res.json(cate);
        }
      );
}
// exports.updateCategory=(req,res)=>{
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
  
//     form.parse(req, (err, fields, file) => {
//       if (err) {
//         return res.status(400).json({
//           error: "problem with image",
//         });
//       }})

//     let category=req.category;
//     category=_.extend(category,fields);

//     category.save((err, category) => {
//         if (err) {
//           return res.status(400).json({
//             error: "updation of product in DB failed",
//           });
//         }
//         return res.json(category);
//       });
// }

exports.removeCategory=(req,res)=>{
    const category=req.category;
    console.log(category)
    category.remove((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                error:"failed to delete"
            })
        }
        res.json({
            msg:"successfully deleted"
        })
    })
}