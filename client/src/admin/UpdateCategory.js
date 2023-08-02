// import React, { useState,useEffect } from "react";
// import Base from "../core/Base";
// //import { isAutheticated } from "../auth
// import { Link } from "react-router-dom";
// import { createCategory,getCategories,updateCategories } from "./helper/adminapicall";
// import { isAuthenticated } from "../auth/helper";

// const AddCategory = ({match}) => {
//   // const [name, setName] = useState("");
//   // const [error, setError] = useState(false);
//   // const [success, setSuccess] = useState(false);
//   // const [formData,setFormData]=useState("");
//   // const [category,setCategory] =useState("")
//   const { user, token } = isAuthenticated();
//   const [values, setValues] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     photo:"",
//     categories:[],
//     category:"",
//     loading:false,
//     error:"",
//     createdProduct:"",
//     getaRedirct:false,
//     formData:"",
//     success:false
//   });

//   const { name, description, price, stock,categories,
//     category,loading,error,createdProduct,getaRedirct,formData,success } = values;

//   const goBack = () => (
//     <div className="mt-5">
//       <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
//         Admin Home
//       </Link>
//     </div>
//   );

//   const preload = () => {
//     getCategories().then(data => {
//         console.log(data);
//         if(data.error){
//           setValues({...values,error:data.error});
//         }else{
          
//           setValues({...values,
//               name:data.name,
//               description:"",
//               price:"",
//               category:"",
//               stock:"",
//               formData:new FormData()
              
//           });
          
//         }
//     });
//   };

//   useEffect(()=>{
//     preload();
//   },[]);


//   const handleChange = name => event => {
//     const value=name==="photo"?event.target.files[0]:event.target.value;
//     formData.set(name,value);
//     setValues({...values,[name]:value});
//   };

//   const onSubmit = event => {
//     event.preventDefault();
//     setValues({...values,error:"",loading:true});


//     //backend request fired
//     updateCategories(match.params.categoryId,user._id, token, formData).then(data => {
//       if(data.error){
//         setValues({...values,error:data.error});
//       }else{
//         setValues({
//           ...values,
//           name:"",
//           description:"",
//           price:"",
//           photo:"",
//           stock:"",
//           loading:false,
//           createdProduct:data.name,
//           success:true
//         })
//       }
//     });
//   };

//   const successMessage = () => {
//     if (success) {
//       return <h4 className="text-success">Category updated successfully</h4>;
//     }
//   };

//   const warningMessage = () => {
//     if (error) {
//       return <h4 className="text-success">Failed to create category</h4>;
//     }
//   };

//   const myCategoryForm = () => (
//     <form>
//       <div className="form-group">
//         <p className="lead">Enter the category</p>
//         <input
//           type="text"
//           className="form-control my-3"
//           onChange={handleChange}
//           value={name}
//           autoFocus
//           required
//           placeholder="enter category"
//         />
//         <button onClick={onSubmit} className="btn btn-outline-info">
//           Update Category
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <Base
//       title="Update category here"
//       description="update category for new tshirts"
//       className="container bg-info p-4"
//     >
//       <div className="row bg-white rounded">
//         <div className="col-md-8 offset-md-2">
//           {successMessage()}
//           {warningMessage()}
//           {myCategoryForm()}
//           {goBack()}
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default AddCategory;

import React, { useState } from "react";
import Base from "../core/Base";
//import { isAutheticated } from "../auth
import { Link } from "react-router-dom";
import { updateCategory} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory(match.params.categoryId,user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;