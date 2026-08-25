// // const jwt=require('jsonwebtoken');
// // require('dotenv').config();
// // const bcrypt=require('bcrypt');
// // const mongoose=require('mongoose');
// // const User=require('../model/users.schema');


// // const auth = async(req,res,next)=>{
// //    try {
// //     //  const token=req.cookies.token ;
// //     const token =
// //     req.cookies?.token ||
// //     req.body?.token ||
// //     req.header("Authorization")?.replace("Bearer ", "");

// //     console.log("TOKEN RECEIVED:", token);
// // console.log("TOKEN TYPE:", typeof token);

// //      if(!token){
// //         return res.status(401).json({message:"Token not found."});
// //      }

// //     const decode=jwt.verify(token,process.env.SECRET_KEY);
// //     console.log(decode);
// //      req.user=decode;

// //      next();

// //    } catch (error) {
// //     console.log(error);
// //     return res.status(401).json({
// //         message:"Invalid or Expired Token."
// //     });
// //    }
// // }

// // const isStudent= async (req,res,next)=>{
// //     const role=req.user.accountType;

// //     if(role!=="Student"){
// //         return res.status(403).json({
// //     message:"Access Denied."
// // });
// //     }
// //     next();

// // }

// // const isInstructor=async (req,res,next)=>{
// //     const role=req.user.accountType;

// //     if(role!=="Instructor"){
// //         return res.status(403).json({
// //     message:"Access Denied."
// // });
// //     }
// //     next();
    
// // }


// // const isAdmin=async (req,res,next)=>{
// //     const role=req.user.accountType;

// //     if(role!=="Admin"){
// //         return res.status(403).json({
// //     message:"Access Denied."
// // });
// //     }
// //     next();
    
// // }


// // module.exports={auth,isAdmin,isStudent,isInstructor};

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

// //auth
// exports.auth = async (req, res, next) => {
//     try{

//         console.log("BEFORE ToKEN EXTRACTION");
//         //extract token
//         const token = req.cookies.token 
//                         || req.body.token 
//                         || req.header("Authorization").replace("Bearer ", "");
//         console.log("AFTER ToKEN EXTRACTION");

//         //if token missing, then return response
//         if(!token) {
//             return res.status(401).json({
//                 success:false,
//                 message:'TOken is missing',
//             });
//         }

//         //verify the token
//         try{
//             const decode =  jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;
//         }
//         catch(err) {
//             //verification - issue
//             return res.status(401).json({
//                 success:false,
//                 message:'token is invalid',
//             });
//         }
//         next();
//     }
//     catch(error) {  
//         return res.status(401).json({
//             success:false,
//             message:'Something went wrong while validating the token',
//         });
//     }
// }

// //isStudent
// exports.isStudent = async (req, res, next) => {
//  try{
//         if(req.user.accountType !== "Student") {
//             return res.status(401).json({
//                 success:false,
//                 message:'This is a protected route for Students only',
//             });
//         }
//         next();
//  }
//  catch(error) {
//     return res.status(500).json({
//         success:false,
//         message:'User role cannot be verified, please try again'
//     })
//  }
// }


// //isInstructor
// exports.isInstructor = async (req, res, next) => {
//     try{
//            if(req.user.accountType !== "Instructor") {
//                return res.status(401).json({
//                    success:false,
//                    message:'This is a protected route for Instructor only',
//                });
//            }
//            next();
//     }
//     catch(error) {
//        return res.status(500).json({
//            success:false,
//            message:'User role cannot be verified, please try again'
//        })
//     }
//    }


// //isAdmin
// exports.isAdmin = async (req, res, next) => {
//     try{    
//            console.log("Printing AccountType ", req.user.accountType);
//            if(req.user.accountType !== "Admin") {
//                return res.status(401).json({
//                    success:false,
//                    message:'This is a protected route for Admin only',
//                });
//            }
//            next();
//     }
//     catch(error) {
//        return res.status(500).json({
//            success:false,
//            message:'User role cannot be verified, please try again'
//        })
//     }
//    }

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.auth = async (req, res, next) => {
//   try {
//     console.log("BEFORE TOKEN EXTRACTION");

//     const token =
//       req.cookies?.token ||
//       req.body?.token ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     console.log("AFTER TOKEN EXTRACTION");

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is missing",
//       });
//     }

//     try {
//       console.log("TOKEN RECEIVED:", token);
// console.log("TOKEN TYPE:", typeof token);
//       const decode = jwt.verify(token, process.env.JWT_SECRET);

//       console.log("Decoded token:", decode);

//       req.user = decode;
//     } catch (error) {
//       console.error("JWT verification error:", error);

      

//       return res.status(401).json({
//         success: false,
//         message: "Token is invalid",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Something went wrong while validating the token",
//     });
//   }
// };

// exports.isStudent = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Student") {
//       return res.status(401).json({
//         success: false,
//         message: "This is a protected route for Students only",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "User role cannot be verified, please try again",
//     });
//   }
// };

// exports.isInstructor = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Instructor") {
//       return res.status(401).json({
//         success: false,
//         message: "This is a protected route for Instructor only",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "User role cannot be verified, please try again",
//     });
//   }
// };

// exports.isAdmin = async (req, res, next) => {
//   try {
//     console.log("Printing AccountType:", req.user.accountType);

//     if (req.user.accountType !== "Admin") {
//       return res.status(401).json({
//         success: false,
//         message: "This is a protected route for Admin only",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "User role cannot be verified, please try again",
//     });
//   }
// };


const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    console.log("BEFORE TOKEN EXTRACTION");

    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("AFTER TOKEN EXTRACTION");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      console.log("TOKEN RECEIVED:", token);
      console.log("TOKEN TYPE:", typeof token);
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded token:", decode);

      req.user = decode;
    } catch (error) {
      console.error("JWT verification error:", error);

      // 👇 Yahan check karo, andar wale catch mein
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Session expired, please login again",
          tokenExpired: true,
        });
      }

      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    console.log("Printing AccountType:", req.user.accountType);

    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};