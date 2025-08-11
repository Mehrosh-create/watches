import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
      default: 0
    },
    image_url: {
      type: String,
      required: [true, "Product image is required"]
    },
    public_id: {
      type: String,
      required: [true, "Image public ID is required"]
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add text index for search functionality
productSchema.index({ 
  productName: 'text', 
  description: 'text' 
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);