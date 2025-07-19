// lib/models/Cart.ts
import mongoose, { Schema } from 'mongoose';

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);