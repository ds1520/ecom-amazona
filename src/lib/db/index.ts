import { error } from 'console';
import mongoose from 'mongoose';

const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
  DATABASE_URL = process.env.DATABASE_URL
) => {
  if (cached.conn) return cached.conn;
  if (!DATABASE_URL) throw new Error('Missing MONGODB_URL');
  cached.promise = cached.promise || mongoose.connect(DATABASE_URL);

  cached.conn = cached.promise;

  return cached.conn;
};
