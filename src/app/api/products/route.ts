import { NextResponse } from 'next/server'
import db from '@/lib/db'
import Product from '@/models/Product'

export async function GET() {
  try {
    await db
    const products = await Product.find({})
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await db
    const product = await Product.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}