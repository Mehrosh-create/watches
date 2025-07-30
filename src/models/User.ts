import { Schema, model, models } from 'mongoose';
import dbConnect from '@/lib/db';

// 1. Define Interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create Schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

// 3. Create Model with check for existing model
const User = models.User || model<IUser>('User', userSchema);

// 4. Export Model
export default User;