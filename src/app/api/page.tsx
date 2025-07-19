import ProductList from '@/components/ProductList';
import Hero from '@/components/Hero';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Hero />
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <a href="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">
            View All →
          </a>
        </div>
        <ProductList products={products} />
      </section>
    </main>
  );
}