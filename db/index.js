import mongoose from "mongoose";

// make it a method with tey catch block to handle error
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("error")
    }
}

export default connectdb;