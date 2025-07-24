"use client"
import { useState } from 'react';
import { FiFilter, FiSearch, FiHeart, FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Luxury Chronograph',
    price: 499.99,
    image: '/images1.jpg',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Classic Leather',
    price: 349.99,
    image: '/images2.jpg',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Sport Pro',
    price: 299.99,
    image: '/images3.jpg',
    rating: 4.5
  },
  {
    id: 4,
    name: 'Diver Pro',
    price: 599.99,
    image: '/images4.jpg',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Minimalist',
    price: 249.99,
    image: '/images5.jpg',
    rating: 4.3
  },
  {
    id: 6,
    name: 'Smart Watch',
    price: 199.99,
    image: '/images6.jpg',
    rating: 4.2
  }
];

const popular = [
  {
    id: 1,
    name: 'Luxury Collection',
    description: 'Premium watches for discerning tastes',
    image: '/images1.jpg',
    count: 24
  },
  {
    id: 2,
    name: 'Sports Collection',
    description: 'Durable watches for active lifestyles',
    image: '/images2.jpg',
    count: 18
  },
  {
    id: 3,
    name: 'Classic Collection',
    description: 'Timeless designs for every occasion',
    image: '/images3.jpg',
    count: 32
  },
  {
    id: 4,
    name: 'Smart Collection',
    description: 'Connected watches with modern features',
    image: '/images4.jpg',
    count: 15
  }
];

const filters = {
  brands: ['Rolex', 'Omega', 'Tag Heuer', 'Seiko', 'Casio'],
  priceRanges: [
    { label: 'Under $100', value: '0-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: 'Over $1000', value: '1000-10000' }
  ]
};

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
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
            <button className="text-sm text-gray-500 hover:text-black">Reset</button>
          </div>

          {/* Brand Filter */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="space-y-2">
              {filters.brands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 mr-2" />
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
                <label key={range.value} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 mr-2" />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </p>
            <select className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
              <option>Best Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <FiHeart className="text-gray-700" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <FiShoppingCart className="text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                Previous
              </button>
              
              {getPageNumbers().map((number, index) => (
                number === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                ) : (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded ${currentPage === number ? 'bg-black text-white' : 'border hover:bg-gray-100'}`}
                  >
                    {number}
                  </button>
                )
              ))}
              
              <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                Next
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}