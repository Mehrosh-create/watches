//app/api/admin/products/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Product from "@/models/Product"
import dbConnect from "@/lib/db"

// GET all products (admin view)
export async function GET() {
  await dbConnect()
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const products = await Product.find({})
  return NextResponse.json(products)
}

// POST create new product
export async function POST(req: Request) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const productData = await req.json()
    const product = await Product.create(productData)
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}



