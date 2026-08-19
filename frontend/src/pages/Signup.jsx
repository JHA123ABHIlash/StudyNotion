// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { BiHide, BiShow } from "react-icons/bi";
// import { useState } from 'react';
// import { useDispatch } from "react-redux";
// import { setSignupData } from '../services/reducer/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { sendOtp } from '../services/operations/authAPI';


// export default function Signup() {

//   const PASSWORD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   const EMAIL_REGEX=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


//   const {
//     register,
//     handleSubmit,
//     formState:{errors}
//   }=useForm({defaultValues: {
//     accountType: "Student",
//   },}); 

//   const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// const dispatch = useDispatch();
// const navigate = useNavigate();

// function showPasswordHandler(){
//   setShowPassword(prev=>!prev);
// }

// function confirmPasswordHandler(){
//   setShowConfirmPassword(prev=>!prev);
// }

// function submitHandler(data){
//   dispatch(setSignupData(data));
//   dispatch(sendOtp(data.email,navigate));
//    console.log(data);
// }

//   return (
//     <div>
//       <form onSubmit={handleSubmit(submitHandler)}>

//          <label htmlFor="firstName">First Name : </label>
//       <input type='text' placeholder='Please Enter Your First Name' 
//         {...register("firstName",{required:"First Name Required."})}
//       /><br/>
//       {errors.firstName && (
//   <p>{errors.firstName.message}</p>
// )}

//     <label htmlFor="lastName">Last Name : </label>
//       <input type='text' placeholder='Please Enter Your Last Name' 
//         {...register("lastName",{required:"Last Name Required."})}
//       /><br/>
//       {errors.lastName && (
//   <p>{errors.lastName.message}</p>
// )}
    
//     <label htmlFor="email">Email : </label>
//       <input type='email' placeholder='Please Enter Your Email' 
//         {...register("email",{required:"Email is Required.",
//           pattern:{
//             value:EMAIL_REGEX,
//             message:"Please Enter Valid Email."
//           }
//         })}
//       /><br/>
//       {errors.email && (
//   <p>{errors.email.message}</p>
// )}
    
//     <label htmlFor="password">Password: </label>
//     <input type={showPassword ? "text" : "password"} placeholder='Please Enter Your Password'
//       {...register('password',{required:"Password is Required.",
//         pattern:{
//           value:PASSWORD_REGEX,
//           message:"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.",
//         },
//       })}        
//     />{showPassword ? (
//                   <BiHide onClick={showPasswordHandler} />
//                 ) : (
//                   <BiShow onClick={showPasswordHandler} />
//       )}<br/>
//       {errors.password && (
//   <p>{errors.password.message}</p>
// )}

//      <label htmlFor="confirmPassword">Confirm  Password: </label>
//      <input type={showConfirmPassword ? "text" : "password"} placeholder='Please Enter Your Confirm Password'
//       {...register('confirmPassword',{required:"Confirm Password is Required.",
//         pattern:{
//           value:PASSWORD_REGEX,
//           message:"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.",
//         },
//       })}
//     />
//     {showConfirmPassword ? (
//                   <BiHide onClick={confirmPasswordHandler} />
//                 ) : (
//                   <BiShow onClick={confirmPasswordHandler} />
//       )}<br/>
//       {errors.confirmPassword && (
//   <p>{errors.confirmPassword.message}</p>
// )}


//       <label htmlFor="accountType">Account Type:</label>
//       <input type='radio' value="Student"
//         {...register("accountType")}  
//       />
//       <label>Student</label>
//       <input type='radio' value="Instructor"
//         {...register("accountType")}  
//       />
//       <label>Instructor</label>

//       <button type='submit'>Send OTP</button>
//       </form>
//     </div>
//   )
// }


import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup