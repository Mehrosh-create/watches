declare namespace User {
  interface Base {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
    createdAt: string
  }

  interface Profile extends Base {
    addresses: Address[]
    paymentMethods: PaymentMethod[]
  }

  interface Address {
    id: string
    type: 'billing' | 'shipping'
    firstName: string
    lastName: string
    address: string
    city: string
    country: string
    postalCode: string
    phone: string
    isDefault: boolean
  }

  interface PaymentMethod {
    id: string
    type: 'card' | 'paypal'
    cardLast4?: string
    isDefault: boolean
  }
}