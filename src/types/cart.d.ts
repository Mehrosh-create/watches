// types/cart.d.ts
declare namespace Cart {
  interface Item {
    id: string
    productId: string
    name: string
    price: number
    image: string
    quantity: number
    stock: number
    variant?: {
      id: string
      name: string
    }
  }

  interface ContextType {
    items: Item[]
    count: number
    total: number
    loading: boolean
    addItem: (product: Product.Base, quantity?: number) => Promise<void>
    updateItem: (productId: string, quantity: number) => Promise<void>
    removeItem: (productId: string) => Promise<void>
    clearCart: () => void
    applyCoupon?: (code: string) => Promise<Coupon>
  }

  interface Coupon {
    code: string
    discount: number
    type: 'percentage' | 'fixed'
    valid: boolean
  }

  interface ShippingMethod {
    id: string
    name: string
    price: number
    estimatedDelivery: string
  }
}