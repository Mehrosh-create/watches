'use client'

import { useWishlist } from '@/context/WishlistContext'
import Link from 'next/link'
import Image from 'next/image'
import { FiTrash2, FiShoppingCart } from 'react-icons/fi'

export default function WishlistPage() {
  const { 
    wishlist, 
    wishlistCount, 
    removeFromWishlist, 
    isInWishlist 
  } = useWishlist()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Wishlist</h1>
        <span className="text-gray-500">{wishlistCount} items</span>
      </div>

      {wishlistCount === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save items you love by clicking the heart icon
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div 
              key={product.id} 
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}