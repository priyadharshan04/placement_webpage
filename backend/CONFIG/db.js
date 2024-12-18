// db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Ensure the MONGO_URL environment variable is defined
    if (!process.env.MONGO_URL) {
      console.error('MONGO_URL is not defined in the .env file');
      process.exit(1); // Exit process with failure if MONGO_URL is missing
    }

    // Connect to MongoDB using the connection string from the environment variable
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      // These options are to prevent deprecation warnings
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
