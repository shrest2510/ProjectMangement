import mongoose from "mongoose";

// make it a method with tey catch block to handle error , making it reusable as everytime we need to add database connection we can just call this method and it will handle the connection and error handling for us
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("error")
    }
}

export default connectdb;