'use client'

import Image from 'next/image'
import Link from 'next/link'

type CartItemProps = {
  item: {
    productId: {
      _id: string
      name: string
      price: number
      image: string
    }
    quantity: number
  }
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      onUpdateQuantity(item.productId._id, newQuantity - item.quantity)
    }
  }

  return (
    <div className="flex items-start border-b pb-4">
      <Link 
        href={`/products/${item.productId._id}`} 
        className="flex-shrink-0 mr-4"
      >
        <Image
          src={item.productId.image}
          alt={item.productId.name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </Link>

      <div className="flex-grow">
        <Link 
          href={`/products/${item.productId._id}`} 
          className="font-medium hover:text-blue-600"
        >
          {item.productId.name}
        </Link>
        <p className="text-gray-600">${item.productId.price.toFixed(2)}</p>

        <div className="flex items-center mt-2">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 py-1 border rounded-l"
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b">
            {item.quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 py-1 border rounded-r"
          >
            +
          </button>
        </div>
      </div>

      <div className="ml-4 text-right">
        <p className="font-medium">
          ${(item.productId.price * item.quantity).toFixed(2)}
        </p>
        <button 
          onClick={() => onRemove(item.productId._id)}
          className="text-red-600 text-sm mt-2 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  )
}