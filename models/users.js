import mongoose , {Schema} from "mongoose";    
import bcrypt from "bcrypt"; // importing bcrypt to hash the password before saving it to the database

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

const User = mongoose.model("User", userSchema); // creating a model for user schema and exporting it to use in other parts of the application
export default User;