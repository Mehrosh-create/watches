declare namespace Order {
  interface Item {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }

  interface ShippingAddress {
    firstName: string
    lastName: string
    address: string
    city: string
    country: string
    postalCode: string
    phone: string
  }

  interface PaymentDetails {
    method: 'card' | 'paypal' | 'bank_transfer'
    transactionId?: string
    cardLast4?: string
  }

  interface Base {
    id: string
    userId: string
    items: Item[]
    subtotal: number
    shipping: number
    tax: number
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    shippingAddress: ShippingAddress
    payment: PaymentDetails
    createdAt: string
    updatedAt: string
  }
}