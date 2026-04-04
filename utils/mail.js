import Mailgen from "mailgen";  
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); 

const mailgen = new Mailgen({  //configuring mailgen with the theme and product information
    theme : "default",
    product : {
        name : "Project Management Tool",
        link : "https://www.projectmanagementtool.com"
    }
});

const transporter = nodemailer.createTransport({ // configuring nodemailer with the mailtrap credentials to send emails
    host : process.env.MAILTRAP_HOST,
    port : process.env.MAILTRAP_PORT,
    auth : {
        user : process.env.MAILTRAP_USER,
        pass : process.env.MAILTRAP_PASS
    }
});


const generateEmailTemplate = (username , verificationurl) => { // content of email template for verification email
        return {
            body : {
            name : username,
            intro : `Welcome to our website! We're excited to have you on board. To get started, please verify your email address by clicking the button below:`,
            action : {
                instructions : `To verify your email address, please click the button below:`,
                button : {
                    color : "#22BC66",
                    text : "Verify Email",
                    link : verificationurl
                }
            },
            outro : "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    };
};

const forgetpassEmailTemplate = (username , passwordurl) => {
        return {
            body : {
            name : username,
            intro : `We got a request to reset your password. To get started, please click the button below:`,
            action : {
                instructions : `To reset your password, please click the button below:`,
                button : {
                    color : "#99e6ba",
                    text : "Reset Password",
                    link : passwordurl
                }
            },
            outro : "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    };
};


const sendEmail = async (to, subject, template) => { 
    const html = mailgen.generate(template);  

    const mailOptions = {
        from: "mail@projectmanagementtool.com",
        to: to,
        subject: subject,
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email", error);
    }
};

export { generateEmailTemplate , forgetpassEmailTemplate , sendEmail };