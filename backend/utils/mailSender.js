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


// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try {
//         const appPassword = (process.env.MAIL_PASS || "").replace(/\s+/g, "");

//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST || "smtp.gmail.com",
//             port: 587,
//             secure: false,
//             requireTLS: true,
//             family: 4,
//             connectionTimeout: 15000,
//             greetingTimeout: 15000,
//             socketTimeout: 15000,
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: appPassword,
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         let info = await transporter.sendMail({
//             from: 'StudyNotion || StudyNotion - Abhilash Jha',
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         });

//         console.log(info);
//         return info;
//     } catch (error) {
//         console.log("Mail sending error:", error);
//         throw error;
//     }
// };

// module.exports = mailSender;


const mailSender = async (email, title, body) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "StudyNotion";

  if (!apiKey || !senderEmail) {
    throw new Error("Brevo email configuration is missing");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [{ email }],
      subject: title,
      htmlContent: body,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Brevo email error:", result);
    throw new Error(result.message || "Unable to send email");
  }

  console.log("Email queued by Brevo:", result.messageId);
  return result;
};

module.exports = mailSender;