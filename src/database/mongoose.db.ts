import { AppError } from '../libs/api.error';
import { logger } from '../infrastructures/utils/logger.utils';
import mongoose from 'mongoose';

type Mongoose = typeof mongoose;
let mongooseConnected: Mongoose | undefined;

export const connectDB = async (): Promise<null> => {
  logger.info('connectDB');
  try {
    if (!mongooseConnected) {
      mongooseConnected = await mongoose.connect(process.env.MONGODB_URI);
    }
    return null;
  } catch (e) {
    throw new AppError('Unable to connect DB', 500);
  }
};
