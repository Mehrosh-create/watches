// components/products/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import WishlistButton from '@/components/products/WishlistButton'

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  discount?: number
  rating?: number
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { id, name, price, imageUrl, discount, rating } = product
  const discountedPrice = discount ? price - (price * discount) / 100 : price

  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Wishlist Button - positioned absolutely */}
      <WishlistButton product={product} />
      
      <Link href={`/products/${id}`} passHref>
        <div className="cursor-pointer">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{name}</h3>
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
              {discount && (
                <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              )}
            </div>

            {/* Rating (optional) */}
            {rating && (
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">{rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard