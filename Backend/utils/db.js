import mongoose from "mongoose";

const connectDB = async () => {
    try {
        
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        
        if (!mongoUri) {
            throw new Error("MongoDB URI not found in environment variables");
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
        });
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
}

export default connectDB;