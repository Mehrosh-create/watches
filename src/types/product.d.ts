// types/product.d.ts
declare namespace Product {
  // Base product structure
  interface Base {
    id: string
    sku: string
    name: string
    slug: string
    description: string
    price: number
    originalPrice?: number
    discount?: number
    stock: number
    images: string[]
    category: string
    rating?: {
      average: number
      count: number
    }
    createdAt: string
    updatedAt: string
  }

  // Product listing (for cards/grids)
  interface Listing extends Pick<Base, 
    'id' | 'name' | 'price' | 'originalPrice' | 'discount' | 'images' | 'rating'
  > {
    variants?: Variant[]
  }

  // Detailed product view
  interface Detailed extends Base {
    specifications: Record<string, string>
    variants: Variant[]
    relatedProducts: Listing[]
    reviews: Review[]
  }

  // Product variant
  interface Variant {
    id: string
    name: string
    price: number
    stock: number
    attributes: Record<string, string> // { color: 'red', size: 'XL' }
    image?: string
  }

  // Product review
  interface Review {
    id: string
    userId: string
    userName: string
    rating: number
    title: string
    comment: string
    createdAt: string
    verifiedPurchase: boolean
  }

  // Filter options
  interface FilterOptions {
    categories: string[]
    priceRange: {
      min: number
      max: number
    }
    attributes: Record<string, string[]> // { color: ['red', 'blue'], size: ['S', 'M'] }
  }

  // Search params
  interface SearchParams {
    query?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating'
    page?: number
    limit?: number
    [key: string]: any // For dynamic filters
  }
}