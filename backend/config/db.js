const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected. DB HOST:  ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB;