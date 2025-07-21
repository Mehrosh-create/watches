import mongoose, { Document } from 'mongoose'

interface IProduct extends Document {
  name: string
  price: number
  description: string
  category: string
  image: string
  stock: number
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)