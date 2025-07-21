import Product from '@/models/Product'
import db from '@/lib/db'

export async function getFeaturedProducts() {
  await db
  return await Product.find({}).limit(4)
}

export async function getProductById(id: string) {
  await db
  return await Product.findById(id)
}