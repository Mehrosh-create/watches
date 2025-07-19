import { connectToDB } from '@/lib/models/database';
import { Product } from '@/lib/models/product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find({}).limit(12);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}