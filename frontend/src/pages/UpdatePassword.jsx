// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { updatePassword } from "../services/operations/profileAPI";

// export default function UpdatePassword() {
//   const token = useSelector((state) => state.auth.token);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const newPassword = watch("newPassword");

//   async function submitHandler(data) {
//     const result = await updatePassword(
//       data.oldPassword,
//       data.newPassword,
//       data.confirmNewPassword,
//       token,
//     );

//     if (result) {
//       reset();
//     }
//   }

//   return (
//     <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">
//       <h2 className="text-xl font-semibold text-richblack-5">
//         Update Password
//       </h2>

//       <form
//         onSubmit={handleSubmit(submitHandler)}
//         className="mt-6 space-y-5"
//       >
//         {/* Current Password */}
//         <div>
//           <label className="mb-2 block text-richblack-50">
//             Current Password
//           </label>

//           <input
//             type="password"
//             {...register("oldPassword", {
//               required: "Current password is required.",
//             })}
//             className="w-full rounded-md bg-richblack-700 p-3 text-white outline-none"
//           />

//           {errors.oldPassword && (
//             <p className="mt-1 text-sm text-pink-200">
//               {errors.oldPassword.message}
//             </p>
//           )}
//         </div>

//         {/* New Password */}
//         <div>
//           <label className="mb-2 block text-richblack-50">
//             New Password
//           </label>

//           <input
//             type="password"
//             {...register("newPassword", {
//               required: "New password is required.",
//               minLength: {
//                 value: 8,
//                 message:
//                   "Password must contain at least 8 characters.",
//               },
//             })}
//             className="w-full rounded-md bg-richblack-700 p-3 text-white outline-none"
//           />

//           {errors.newPassword && (
//             <p className="mt-1 text-sm text-pink-200">
//               {errors.newPassword.message}
//             </p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <label className="mb-2 block text-richblack-50">
//             Confirm New Password
//           </label>

//           <input
//             type="password"
//             {...register("confirmNewPassword", {
//               required:
//                 "Please confirm your new password.",
//               validate: (value) =>
//                 value === newPassword ||
//                 "Passwords do not match.",
//             })}
//             className="w-full rounded-md bg-richblack-700 p-3 text-white outline-none"
//           />

//           {errors.confirmNewPassword && (
//             <p className="mt-1 text-sm text-pink-200">
//               {errors.confirmNewPassword.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900"
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword