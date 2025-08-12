// src/components/products/AddToCart.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Product } from '@/types/product'

export default function AddToCart({ product }: { product: Product.Base }) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity
      })
      toast.success(`${product.name} added to cart!`, {
        position: 'top-center',
        action: {
          label: 'View Cart',
          onClick: () => (window.location.href = '/cart')
        }
      })
    } catch (error) {
      toast.error('Failed to add item to cart')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="w-10 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
          disabled={quantity >= product.stock}
        >
          +
        </Button>
        <span className="text-sm text-gray-500">
          {product.stock} available
        </span>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={isLoading || product.stock === 0}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          product.stock === 0 ? 'Out of Stock' : 'Add to Cart'
        )}
      </Button>
    </div>
  )
}