// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected on host ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB CONNECTION FAILED:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
