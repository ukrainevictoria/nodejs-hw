import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    const connectionString = process.env.MONGO_URL;

    if (!connectionString) {
      throw new Error('Missing MONGO_URL environment variable in .env file');
    }

    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default initMongoDB;
