import mongoose , {Schema} from "mongoose";    
import bcrypt from "bcrypt"; // importing bcrypt to hash the password before saving it to the database
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({ // creating a schema for user model with name , email and password as required fields and email should be unique
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    refreshtoken : {
        type : String
    },
    forgotpasswordtoken : {
        type : String
    },
    forgotpasswordexpires : {
        type : Date
    },
    emailverificationtoken : {
        type : String
    }  , 
    emailverificationexpires : {
        type : Date
    }
})

userSchema.pre("save", async function(next){ // pre save hook to hash the password before saving it to the database
    if(!this.isModified("password")){ // if the password is not modified then move to the next middleware
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.generateaccessToken = function(){ // method to generate a token for the user
    const token = jwt.sign({ _id : this._id }, process.env.ACCESS_JWT_SECRET, { expiresIn : "1h" }); // signing the token with the user's id and secret key and setting the expiration time to 1 hour
    return token;
}

userSchema.methods.generaterefreshToken = function(){ // method to generate a refresh token for the user
    const token = jwt.sign({ _id : this._id }, process.env.REFRESH_JWT_SECRET, { expiresIn : "7d" }); // signing the token with the user's id and secret key and setting the expiration time to 7 days
    return token;
}

userSchema.methods.generateEmailVerificationToken = function () {
    const token = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    this.emailverificationtoken = hashedToken;
    this.emailverificationexpires = Date.now() + 3600000; // 1 hour

    return token;
};

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    const hashedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.forgotpasswordtoken = hashedResetToken;
    this.forgotpasswordexpires = Date.now() + 3600000;

    return resetToken;
};

const User = mongoose.model("User", userSchema); // creating a model for user schema and exporting it to use in other parts of the application
export default User;