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