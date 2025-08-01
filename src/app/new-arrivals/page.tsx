import { FiClock, FiHeart, FiShoppingCart } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

const newArrivals = [
  {
    id: 1,
    name: 'Avant-Garde Edition',
    price: 799.99,
    image: '/Avant.jpg',
    isNew: true,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Neo Classic',
    price: 649.99,
    image: '/Neo.jpg',
    isNew: true,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Carbon Fiber Pro',
    price: 899.99,
    image: '/carbon.jpg',
    isNew: true,
    rating: 5.0
  },
  {
    id: 4,
    name: 'Solar Chrono',
    price: 549.99,
    image: '/Solar.jpg',
    isNew: true,
    rating: 4.5
  }
]

export default function NewArrivalsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">New Arrivals</h1>
          <p className="text-gray-600 mt-2">Fresh designs just added to our collection</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <FiClock className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">Updated daily</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {product.isNew && (
                <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  New Arrival
                </div>
              )}
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
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          View All Products
        </Link>
      </div>
    </div>
  )
}