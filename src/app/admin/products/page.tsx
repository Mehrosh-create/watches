// app/admin/products/page.tsx
import { connectToDB } from '@/lib/models/database';
import { Product } from '@/lib/models/product';
import AdminProductsTable from '@/components/admin/ProductTable';

export default async function AdminProductsPage() {
  await connectToDB();
  const products = await Product.find({});

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <a
          href="/admin/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Product
        </a>
      </div>
      <AdminProductsTable products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}