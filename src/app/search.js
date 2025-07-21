// pages/search.js
import { useState } from 'react';
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults"; // You'll need to create this

export default function SearchPage() {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: null,
    features: [],
    availability: 'all',
    sortBy: 'relevance'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Trigger search when filters change
    performSearch(newFilters);
  };

  const performSearch = async (searchFilters) => {
    setIsLoading(true);
    try {
      // Simulate API call
      // const response = await fetch('/api/search', {
      //   method: 'POST',
      //   body: JSON.stringify(searchFilters)
      // });
      // const data = await response.json();
      
      // Mock data - replace with actual API call
      setTimeout(() => {
        setResults(generateMockResults(searchFilters));
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Search error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
            <SearchFilters 
              filters={filters}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        
        {/* Results section */}
        <div className="w-full md:w-3/4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <SearchResults results={results} />
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function for mock data
function generateMockResults(filters) {
  // This would be replaced with actual API results
  const mockProducts = [
    { id: 1, name: 'Premium Headphones', price: 299, rating: 4.5, category: 'electronics' },
    { id: 2, name: 'Wireless Earbuds', price: 159, rating: 4.2, category: 'electronics' },
    { id: 3, name: 'Smart Watch', price: 199, rating: 4.0, category: 'electronics' },
    { id: 4, name: 'Running Shoes', price: 89, rating: 4.7, category: 'sports' },
    { id: 5, name: 'Yoga Mat', price: 29, rating: 4.3, category: 'sports' },
  ];

  // Apply filters to mock data
  return mockProducts.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    return true;
  });
}