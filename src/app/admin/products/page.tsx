// app/admin/products/page.tsx (client component)
'use client'

import { useState } from 'react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const handleDeleteSuccess = (deletedId: string) => {
    setProducts(products.filter(p => p.id !== deletedId))
  }

  return (
    <table>
      {/* ... */}
      {products.map(product => (
        <tr key={product.id}>
          {/* ... */}
          <td>
            <DeleteProductButton
              productId={product.id}
              productName={product.name}
              onSuccess={() => handleDeleteSuccess(product.id)}
            />
          </td>
        </tr>
      ))}
    </table>
  )
}