import { NextResponse } from 'next/server'
import Product from '@/models/Product'
import dbConnect from '@/lib/db'

export async function GET(request: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '10')

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).limit(limit)

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error('SEARCH_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to perform search" },
      { status: 500 }
    )
  }
}