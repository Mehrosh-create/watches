import Product from '@/models/Product'
import db from '@/lib/db'

// Featured products
export async function getFeaturedProducts() {
  await db
  return await Product.find({}).limit(4)
}

// Get product by ID
export async function getProductById(id: string) {
  await db
  return await Product.findById(id)
}

// Dummy searchProducts for search page (expand this logic later!)
export async function searchProducts(searchParams: any) {
  await db

  // Example: Find all, filter/limit logic can be added here
  const products = await Product.find({}) // You may add filters based on searchParams

  // Dummy values for filters - in real app, build from products DB
  const categories = ['Watches', 'Smartwatches', 'Accessories']
  const priceRange = { min: 0, max: 9999 }
  const brands = ['Casio', 'Rolex', 'Fossil']
  const ratings = [5, 4, 3, 2, 1]

  return {
    products,
    total: products.length,
    categories,
    priceRange,
    brands,
    ratings
  }
}
