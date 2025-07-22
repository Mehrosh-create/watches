import { Product } from '@/types/product'
import ProductCard from '@/components/products/ProductCard'
import SearchFilters from '@/components/search/SearchFilters'
// Note: You must actually implement and export searchProducts!
import { searchProducts } from '@/lib/api/products'

interface SearchPageProps {
  searchParams: Product.SearchParams
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // This will error unless you implement searchProducts as shown above!
  const { products, categories, priceRange, brands, ratings } = await searchProducts(searchParams)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {searchParams.q ? `Results for "${searchParams.q}"` : "Browse Products"}
      </h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SearchFilters
            categories={categories || []}
            priceRange={priceRange || { min: 0, max: 9999 }}
            brands={brands || []}
            ratings={ratings || [5, 4, 3, 2, 1]}
          />
        </div>
        <div className="md:col-span-3">
          {products.length === 0 ? (
            <p>No products found. Try different filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: Product.Base) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.images?.[0] || "/placeholder.jpg"}
                  discount={product.discount}
                  rating={product.rating?.average}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
