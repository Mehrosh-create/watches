// app/search/page.tsx
import { SearchParams } from "@/types"
import ProductCard from "@/components/products/ProductCard"
import SearchFilters from "@/components/products/AddToCart"
import { searchProducts } from "@/lib/api/products"

interface SearchPageProps {
  searchParams: SearchParams
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category, sort, page } = searchParams
  const { products, total } = await searchProducts(searchParams)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {q ? `Results for "${q}"` : "Browse Products"}
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SearchFilters />
        </div>

        <div className="md:col-span-3">
          {products.length === 0 ? (
            <p>No products found. Try different filters.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Pagination would go here */}
            </>
          )}
        </div>
      </div>
    </div>
  )
}