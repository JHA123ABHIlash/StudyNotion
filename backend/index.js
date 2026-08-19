// const express=require('express');
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// require("dotenv").config();

// const app=express();
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
// }));

// const userRoutes=require('./routes/user.routes');
// const profileRoutes=require('./routes/profile.routes');
// const tagRoutes=require('./routes/tag.routes');
// const courseRoutes=require('./routes/course.routes');
// const sectionRoutes=require('./routes/section.routes');
// const subSectionRoutes=require('./routes/subSection.routes');
// const ratingAndReviewsRoutes=require('./routes/ratingAndReviews.routes');
// const courseProgressRoutes=require('./routes/courseProgress.routes');
// const paymentRoutes=require('./routes/payment.routes');
// const instructorDashboard=require('./routes/instructorDashboard.routes');

// const PORT=process.env.PORT || 4000;
// const main = require("./config/database");


// app.get("/", (req,res)=>{
//     res.json({
//         success:true,
//         message:"Server Running"
//     })
// })


// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/course", sectionRoutes);
// app.use("/api/v1/course", subSectionRoutes);
// app.use("/api/v1/tag", tagRoutes);
// app.use("/api/v1/rating-review", ratingAndReviewsRoutes);
// app.use("/api/v1/progress", courseProgressRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use('/api/v1/dashboard',instructorDashboard);

// app.use((req,res)=>{
//     return res.status(404).json({
//         success:false,
//         message:"Route Not Found"
//     })
// })

// async function startServer() {
//     await main();;

//     app.listen(PORT, () => {
//         console.log(`Server running on ${PORT}`);
//     });
// }

// startServer();

const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
        optionSuccessStatus:200,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})

