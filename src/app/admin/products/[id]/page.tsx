// app/admin/products/[id]/page.tsx
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      {/* ... product details ... */}
      <div className="mt-8 flex gap-4">
        <Link
          href={`/admin/products/edit/${params.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Product
        </Link>
        <DeleteProductButton
          productId={params.id}
          productName="This Product" // Fetch actual name if needed
          onSuccess={() => {
            // Redirect after deletion
            window.location.href = '/admin/products'
          }}
        />
      </div>
    </div>
  )
}