"use client"
import { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiHeart, FiShoppingCart } from 'react-icons/fi';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  brand: string;
  dateAdded: string;
}

interface PriceRange {
  label: string;
  value: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Luxury Chronograph',
    price: 499.99,
    image: '/images1.jpg',
    rating: 4.8,
    brand: 'Rolex',
    dateAdded: '2023-10-15'
  },
  {
    id: 2,
    name: 'Classic Leather',
    price: 349.99,
    image: '/classicl.jpg',
    rating: 4.6,
    brand: 'Omega',
    dateAdded: '2023-11-20'
  },
  {
    id: 3,
    name: 'Sport Pro',
    price: 299.99,
    image: '/sport.jpg',
    rating: 4.5,
    brand: 'Tag Heuer',
    dateAdded: '2023-09-05'
  },
  {
    id: 4,
    name: 'Diver Pro',
    price: 599.99,
    image: '/diver.jpg',
    rating: 4.9,
    brand: 'Seiko',
    dateAdded: '2023-12-10'
  },
  {
    id: 5,
    name: 'Minimalist',
    price: 249.99,
    image: '/minimalist.jpg',
    rating: 4.3,
    brand: 'Casio',
    dateAdded: '2023-08-22'
  },
  {
    id: 6,
    name: 'Smart Watch',
    price: 199.99,
    image: '/images6.jpg',
    rating: 4.2,
    brand: 'Casio',
    dateAdded: '2023-07-30'
  }
];

const filters = {
  brands: ['Rolex', 'Omega', 'Tag Heuer', 'Seiko', 'Casio'],
  priceRanges: [
    { label: 'Under $100', value: '0-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: 'Over $1000', value: '1000-10000' }
  ] as PriceRange[]
};

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const productsPerPage = 6;

  // Apply filters and sorting
  useEffect(() => {
    let results = [...allProducts];
    
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedBrands.length > 0) {
      results = results.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    if (selectedPriceRanges.length > 0) {
      results = results.filter(product => {
        return selectedPriceRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && product.price <= max;
        });
      });
    }
    
    switch (sortOption) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'best-rated':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        results.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchQuery, selectedBrands, selectedPriceRanges, sortOption]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination controls
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle brand selection
  const handleBrandSelect = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  // Handle price range selection
  const handlePriceRangeSelect = (range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range) 
        : [...prev, range]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSearchQuery('');
    setSortOption('featured');
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Shop Watches</h1>
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg flex items-center">
              <FiFilter className="mr-2" /> Filters
            </h2>
            <button 
              className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          {/* Brand Filter */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="space-y-2">
              {filters.brands.map(brand => (
                <label key={brand} className="flex items-center hover:text-black transition-colors duration-200">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 mr-2 hover:border-black transition-colors duration-200" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandSelect(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              {filters.priceRanges.map(range => (
                <label key={range.value} className="flex items-center hover:text-black transition-colors duration-200">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 mr-2 hover:border-black transition-colors duration-200" 
                    checked={selectedPriceRanges.includes(range.value)}
                    onChange={() => handlePriceRangeSelect(range.value)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 hover:scale-[1.02] transform"
          >
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </p>
            <select 
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black hover:border-gray-400 transition-colors duration-200"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="best-rated">Best Rated</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
              <button 
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300 hover:scale-105 transform"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="relative h-100 bg-gray-200 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform">
                          <FiHeart className="text-gray-700 hover:text-red-500 transition-colors duration-300" />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform">
                          <FiShoppingCart className="text-gray-700 hover:text-green-600 transition-colors duration-300" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg group-hover:text-black-600 transition-colors duration-300">{product.name}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="font-bold text-lg group-hover:text-black transition-colors duration-300">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-1">
                    <button 
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 transition-colors duration-200'}`}
                    >
                      Previous
                    </button>
                    
                    {getPageNumbers().map((number, index) => (
                      number === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                      ) : (
                        <button
                          key={number}
                          onClick={() => paginate(number as number)}
                          className={`px-3 py-1 rounded transition-colors duration-200 ${currentPage === number ? 'bg-black text-white' : 'border hover:bg-gray-100'}`}
                        >
                          {number}
                        </button>
                      )
                    ))}
                    
                    <button 
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 transition-colors duration-200'}`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}