'use client'

import { useState, useEffect } from 'react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton/DeleteProductButton'
import { Product } from '@/types/product'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product.Base[]>([])

  // Optional: Load initial products from API
  useEffect(() => {
    // Replace with your real API call
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
  }, [])

  const handleDeleteSuccess = (deletedId: string) => {
    setProducts(products.filter(p => p.id !== deletedId))
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">${product.price}</td>
              <td className="py-2 px-4 border">{product.stock}</td>
              <td className="py-2 px-4 border">
                <DeleteProductButton
                  productId={product.id}
                  productName={product.name}
                  onSuccess={() => handleDeleteSuccess(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
