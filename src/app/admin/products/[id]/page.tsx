'use client' // Make this a client component if you want to use router or window

import { DeleteProductButton } from '@/components/admin/DeleteProductButton/DeleteProductButton'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  // Add more fields as needed
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Replace this with your actual API call
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [params.id])

  if (!product) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      {/* ... other product details ... */}
      <div className="mt-8 flex gap-4">
        <Link
          href={`/admin/products/edit/${params.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Product
        </Link>
        <DeleteProductButton
          productId={params.id}
          productName={product.name}
          onSuccess={() => {
            window.location.href = '/admin/products'
            // Or use useRouter from 'next/navigation' if you prefer:
            // router.push('/admin/products')
          }}
        />
      </div>
    </div>
  )
}
