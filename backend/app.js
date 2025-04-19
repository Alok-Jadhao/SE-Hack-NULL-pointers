import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Note the .js extension is required in ES modules
import authRoutes from './routes/authRoutes.js';// Import your DB connection function

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connection established');
  })
  .catch((err) => {
    console.log('MongoDB connection failed:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});