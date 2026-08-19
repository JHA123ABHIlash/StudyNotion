// import React, { useEffect, useState } from "react";
// import OtpInput from "react-otp-input";
// import { useSelector, useDispatch } from "react-redux";
// import { sendOtp, signup } from "../services/operations/authAPI";
// import { useNavigate, Navigate } from "react-router-dom";

// export default function VerifyEmail() {
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(60);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { signupData } = useSelector((state) => state.auth);

//   if (!signupData) {
//     return <Navigate to="/signup" />;
//   }

//   useEffect(() => {
//     if (timer <= 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer > 0]);

//   function submitHandler(e) {
//     e.preventDefault();

//     dispatch(signup(signupData, otp, navigate));
//   }

//   return (
//     <div>
//       <h3>Verify Email</h3>

//       <p>A verification code has been sent to your email.</p>
//       <form onSubmit={submitHandler}>
//         <OtpInput
//           value={otp}
//           onChange={setOtp}
//           numInputs={6}
//           renderSeparator={<span>-</span>}
//           renderInput={(props) => <input {...props} />}
//         />

//         <button type="submit">Verify OTP</button>
//         {timer > 0 ? (
//           <p>Resend OTP in {timer}s</p>
//         ) : (
//           <p>You can resend OTP now.</p>
//         )}
//         <button
//           type="button"
//           disabled={timer > 0}
//           onClick={() => {
//             dispatch(sendOtp(signupData.email, navigate));
//             setTimer(60);
//           }}
//         >
//           Resend OTP
//         </button>
//       </form>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;