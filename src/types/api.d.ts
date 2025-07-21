// types/api.d.ts
declare namespace API {
  // Base response structure
  interface BaseResponse<T = any> {
    success: boolean
    data?: T
    error?: {
      message: string
      code?: string
      details?: Record<string, string>
    }
    pagination?: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }

  // Auth responses
  interface AuthResponse {
    user: {
      id: string
      name: string
      email: string
      role: 'user' | 'admin'
    }
    token?: string
  }

  // Cart responses
  interface CartResponse {
    items: Cart.Item[]
    total: number
  }

  // Product responses
  interface ProductListResponse {
    products: Product.Listing[]
    filters: {
      categories: string[]
      priceRange: {
        min: number
        max: number
      }
    }
  }

  // Order responses
  interface OrderResponse {
    id: string
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    items: Order.Item[]
    total: number
    createdAt: string
  }
}