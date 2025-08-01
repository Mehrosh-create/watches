// components/products/ProductList.tsx
import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'

interface ProductListProps {
  products: Product.Listing[]
  title?: string
  showViewAll?: boolean
  viewAllLink?: string
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  title,
  showViewAll = false,
  viewAllLink = '/products',
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No products found</p>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {(title || showViewAll) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          {showViewAll && (
            <a
              href={viewAllLink}
              className="text-primary-600 hover:text-primary-800 font-medium text-sm"
            >
              View All →
            </a>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.images[0],
              discount: product.discount,
              rating: product.rating?.average
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductList