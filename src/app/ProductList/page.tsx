import ProductList from '@/components/ProductList';

// In your page component (can be server component)
async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <main>
      <h2 className="text-2xl font-bold mb-6">Featured Watches</h2>
      <ProductList products={products} />
    </main>
  );
}