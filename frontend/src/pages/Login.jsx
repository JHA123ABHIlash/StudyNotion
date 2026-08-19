// import React, { useState } from "react";
// import { BiHide, BiShow } from "react-icons/bi";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { login } from "../services/operations/authAPI";


// export default function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate=useNavigate();
//   const dispatch=useDispatch();


//   const PASSWORD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   const EMAIL_REGEX=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const [show, setShow] = useState(false);

//   function showPassword() {
//     setShow((prev) => !prev);
//   }

//   function submitHandler(data) {
//     dispatch(login(data,navigate));
//   }

//   return (
//     <div>
//       <div>
//         <h1>Welcome Back</h1>
//         <p>Build skills for today, tomorrow, and beyond.</p>
//         <p>
//           <span>Education to future-proof your career.</span>
//         </p>
//       </div>

//       <br />

//       <div>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             placeholder="Please Enter Your Email"
//             {...register("email", {
//               required: "Email is required.",
//               pattern: {
//                 value: EMAIL_REGEX,
//                 message: "Please Enter Valid Email Address.",
//               },
//             })}
//           />
//           {/* Return Error when Email is not Entered. */}
//           {errors.email && <p>{errors.email.message}</p>}
//           <br />

//           <label htmlFor="password">Password</label>
//           <input
//             type={show ? "text" : "password"}
//             placeholder="Please Enter Your Password"
//             {...register("password", {
//               required: "Password is required.",
//               pattern: {
//                 value:PASSWORD_REGEX,
//                 message:
//                   "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.",
//               },
//             })}
//           />
//           {/* Return Error when password is not valid. */}
//           {errors.password && <p>{errors.password.message}</p>}

//           {show ? (
//             <BiHide onClick={showPassword} />
//           ) : (
//             <BiShow onClick={showPassword} />
//           )}
//           <br />

//           <Link to="/forget-password">Forget Password</Link>
//           <br />

//           <button type="submit">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// }


import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login