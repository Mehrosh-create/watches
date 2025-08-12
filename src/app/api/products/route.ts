import { connectDB } from "@/app/api/db/connectDB";
import { Product } from "@/app/api/image.model";
import { UploadImage } from "@/app/lib/upload-image";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();

  try {
    const formData = await request.formData();
    
    // Extract product data
    const productName = formData.get("productName") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const stockQuantity = parseInt(formData.get("stockQuantity") as string);
    const imageFile = formData.get("image") as File;

    // Validate required fields
    if (!productName || !description || !imageFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadResult = await UploadImage(imageFile, "products");

    // Create product in database
    const product = await Product.create({
      productName,
      price,
      description,
      stockQuantity,
      image_url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}