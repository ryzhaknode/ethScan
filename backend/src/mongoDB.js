import mongoose from "mongoose";

const URL = "mongodb+srv://ryzhaknode:Ryz16091999@cluster0.c5pwidp.mongodb.net/";
export const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};