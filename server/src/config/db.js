import './env.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sense_iiui';
    const conn = await mongoose.connect(uri, {
      dbName: 'sense_iiui',
      serverSelectionTimeoutMS: 8000
    });
    console.log(`[MongoDB] Connected to cluster: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
