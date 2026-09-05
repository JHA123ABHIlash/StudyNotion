const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                family: 4, // force IPv4 - Render's network can't route IPv6 to Gmail's SMTP servers (causes ENETUNREACH)
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