// app/products/[id]/page.tsx
import { connectToDB }  from '@/lib/models/database';
import { Product } from '@/lib/models/product';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  await connectToDB();
  const product = await Product.findById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {/* Image gallery would go here */}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-gray-600">{product.description}</p>
          <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}