import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product  from '@/models/Product' // Adjust the import path as necessary

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connect to MongoDB

    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return new NextResponse('Product not found', { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
