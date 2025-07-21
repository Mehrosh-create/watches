import { getProductById } from '@/lib/api/products'
import AddToCart from '@/components/products/AddToCart'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images Gallery */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-8">
            <img src={product.image} className="w-full h-96 object-contain" />
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl my-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <AddToCart product={product} />
          
          {/* Product Tabs */}
          <div className="mt-8">
            [Specs | Reviews | Shipping]
          </div>
        </div>
      </div>
    </div>
  )
}