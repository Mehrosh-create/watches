import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 5000, // 5s timeout
      socketTimeoutMS: 45000, // 45s socket timeout
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
    throw error;
  }
};