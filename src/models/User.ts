import mongoose, { Document } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
  name: string
  role: 'user' | 'admin'
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)