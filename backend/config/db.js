const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
            throw new Error("Missing MONGODB_URI or DB_NAME in environment variables.");
        }

        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB connected. DB HOST: ${connectInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MONGODB CONNECTION FAILED:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
