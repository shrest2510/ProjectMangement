import User from "../models/users.js";
import { sendEmail } from "../utils/mail.js";

const registereduser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExists=await User.findOne({$or: [{email}, {name}]});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user=await User.create({
        name,
        email,
        password
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            accessToken:user.generateAccessToken(),
            refreshToken:user.generateRefreshToken(),
            emailverificationToken:user.generateEmailVerificationToken(),
            passwordResetToken:user.generatePasswordResetToken()
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    user.emailverificationToken=token;
    await user.save();
});

await sendEmail(user.email, "Email Verification", `Please verify your email by clicking the following link: http://localhost:3000/api/auth/verify-email?token=${resetToken}`);

export {registereduser};