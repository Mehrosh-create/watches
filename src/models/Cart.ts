import mongoose, { Schema } from "mongoose"

interface ICartItem {
  productId: Schema.Types.ObjectId
  quantity: number
}

interface ICart extends Document {
  userId: Schema.Types.ObjectId
  items: ICartItem[]
}

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true })

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema)