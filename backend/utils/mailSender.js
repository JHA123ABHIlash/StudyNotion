// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 family: 4, // force IPv4 - Render's network can't route IPv6 to Gmail's SMTP servers (causes ENETUNREACH)
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || StudyNotion - Abhilash Jha',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//          console.log("Mail sending error:", error);
//     throw error;
//     }
// }


// module.exports = mailSender;


const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                port: 465,
                secure: true, // use SSL on port 465 instead of STARTTLS on 587 - often more reliable on cloud hosts
                family: 4, // force IPv4 - Render's network can't route IPv6 to Gmail's SMTP servers (causes ENETUNREACH)
                connectionTimeout: 10000, // fail fast (10s) instead of hanging
                greetingTimeout: 10000,
                socketTimeout: 10000,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'StudyNotion || StudyNotion - Abhilash Jha',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
         console.log("Mail sending error:", error);
    throw error;
    }
}


module.exports = mailSender;