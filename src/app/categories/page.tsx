'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiClock, FiStar, FiShoppingBag } from 'react-icons/fi'
import Marquee from "react-fast-marquee";

const categories = [
  {
    id: 1,
    name: 'Luxury Watches',
    image: '/watch1.jpg',
    count: 42,
    description: 'Premium timepieces from renowned brands',
    popular: true
  },
  {
    id: 2,
    name: 'Sports Watches',
    image: '/watch2.jpg',
    count: 28,
    description: 'Durable watches for active lifestyles',
    popular: true
  },
  {
    id: 3,
    name: 'Smart Watches',
    image: '/watch3.jpg',
    count: 35,
    description: 'Connected watches with advanced features'
  },
  {
    id: 4,
    name: 'Classic Watches',
    image: '/classic.jpg',
    count: 22,
    description: 'Timeless designs for every occasion'
  },
  {
    id: 5,
    name: 'Diving Watches',
    image: '/watch5.jpg',
    count: 18,
    description: 'Water-resistant professional timepieces'
  },
  {
    id: 6,
    name: 'Pilot Watches',
    image: '/watch6.jpg',
    count: 14,
    description: 'Aviation-inspired chronographs'
  },
  {
    id: 7,
    name: 'Limited Editions',
    image: '/watch7.jpg',
    count: 8,
    description: 'Exclusive collector\'s items',
    new: true
  },
  {
    id: 8,
    name: 'Vintage Watches',
    image: '/watch8.jpg',
    count: 25,
    description: 'Classic watches with history'
  }
]

const popular = [
  {
    id: 1,
    name: 'Luxury Watches',
    image: '/luxury.jpg',
    count: 42,
    description: 'Premium timepieces from renowned brands',
    new: true
  },
  {
    id: 2,
    name: 'Sports Watches',
    image: '/sport.jpg',
    count: 28,
    description: 'Durable watches for active lifestyles'
  }
]

const brands = [
  { name: 'Rolex', logo: '/brands/rolex.png' },
  { name: 'Omega', logo: '/brands/omega.png' },
  { name: 'Tag Heuer', logo: '/brands/tagheuer.jpg' },
  { name: 'Seiko', logo: '/brands/seiko.jpg' },
  { name: 'Casio', logo: '/brands/casio.jpg' },
  { name: 'Fossil', logo: '/brands/fossil.jpg' }
]

// Duplicate brands for seamless scrolling
const duplicatedBrands = [...brands, ...brands]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Video Background */}
      <div className="relative bg-gray-900 text-white rounded-xl overflow-hidden mb-12 h-[600px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source 
            src="https://videos.pexels.com/video-files/17186323/17186323-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Collections</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Discover the perfect timepiece for every style and occasion
          </p>
          <div className="flex gap-4">
            <Link 
              href="/shop" 
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition flex items-center"
            >
              <FiShoppingBag className="mr-2" /> Shop All
            </Link>
            <Link 
              href="#popular" 
              className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Popular Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Categories with Hover Animation */}
      <section id="popular" className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {popular.map(item => (
            <Link
              key={item.id}
              href={`/shop?popular=${item.id}`}
              className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative h-64 bg-gray-200 overflow-hidden rounded-t-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FiStar className="mr-1" /> Popular
                  </div>
                  {item.new && (
                    <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{item.name}</h2>
                    <p className="text-white/80 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 text-sm flex items-center">
                        <FiClock className="mr-1" /> {item.count} items
                      </span>
                      <div className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm font-medium">
                        View Collection
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Categories with Hover Animation */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">All Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/shop?category=${category.id}`}
              className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {category.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FiStar className="mr-1 w-3 h-3" /> Popular
                  </div>
                )}
                {category.new && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    New Arrivals
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg group-hover:text-black mb-1">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{category.count} products</span>
                  <span className="text-black font-medium group-hover:translate-x-1 transition-transform">Shop now →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Brand - Improved Marquee */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Brand</h2>
        <div className="overflow-hidden">
          <Marquee 
            speed={50}
            pauseOnHover={true}
            gradient={true}
            gradientColor="rgb(248, 250, 252)"
            gradientWidth={80}
            className="py-4"
            direction="left"
          >
            {duplicatedBrands.map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={`/shop?brand=${brand.name.toLowerCase().replace(' ', '-')}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mx-4 min-w-[160px] h-28 flex items-center justify-center group border border-gray-100"
              >
                <div className="relative w-32 h-20">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 p-2"
                    sizes="120px"

                  />
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
        
        {/* Alternative: Reverse direction marquee */}
        <div className="overflow-hidden mt-4">
          <Marquee 
            speed={40}
            pauseOnHover={true}
            gradient={true}
            gradientColor="rgb(248, 250, 252)"
            gradientWidth={80}
            className="py-4"
            direction="right"
          >
            {duplicatedBrands.reverse().map((brand, index) => (
              <Link
                key={`reverse-${brand.name}-${index}`}
                href={`/shop?brand=${brand.name.toLowerCase().replace(' ', '-')}`}
                className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mx-4 min-w-[160px] h-28 flex items-center justify-center group border border-gray-100"
              >
                <div className="relative w-32 h-20">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 p-2"
                    sizes="120px"
                  />
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-8 md:p-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Edition Collection</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our exclusive limited edition watches that combine exceptional craftsmanship with unique design
          </p>
          <Link 
            href="/shop?collection=limited" 
            className="inline-block bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            View Limited Editions
          </Link>
        </div>
      </section>

      {/* Category Tips */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Choosing Your Perfect Watch</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FiStar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-3">By Style</h3>
            <p className="text-gray-600 mb-4">
              Consider your personal style - whether you prefer classic elegance, modern minimalism, or sporty functionality.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FiClock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-3">By Occasion</h3>
            <p className="text-gray-600 mb-4">
              Different occasions call for different watches. We have collections perfect for formal events, daily wear, or outdoor adventures.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FiShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-3">By Feature</h3>
            <p className="text-gray-600 mb-4">
              Need specific features? Explore watches with water resistance, chronographs, smart capabilities, or automatic movements.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}