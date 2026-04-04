import User from "../models/users.js";
import { sendEmail, generateEmailTemplate } from "../utils/mail.js";
import asyncHandler from "express-async-handler";

const registereduser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid user data");
    }

    const emailToken = user.generateEmailVerificationToken();

    await user.save();

    await sendEmail(
        user.email,
        "Email Verification",
        generateEmailTemplate(
            user.name,
            `http://localhost:${process.env.PORT}/api/v1/auth/verify-email?token=${emailToken}`
        )
    );

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: user.generateaccessToken(),
        refreshToken: user.generaterefreshToken()
    });
});

export { registereduser };