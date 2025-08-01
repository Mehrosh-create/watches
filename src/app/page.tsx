"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cursor from '../components/Cursor';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  placeholder: string;
  rating: number;
  width: number;
  height: number;
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Luxury Chronograph',
      price: 499.99,
      image: '/unique.jpg',
      placeholder: '/luxuryy-placeholder.jpg',
      rating: 4.8,
      width: 680,
      height: 1000
    },
    {
      id: 2,
      name: 'Classic Leather',
      price: 349.99,
      image: '/leather.jpg',
      placeholder: '/leatherrr-placeholder.jpg',
      rating: 4.6,
      width: 680,
      height: 1000
    },
    {
      id: 3,
      name: 'Sport Pro',
      price: 299.99,
      image: '/sportsss.jpg',
      placeholder: '/sportsss-placeholder.jpg',
      rating: 4.5,
      width: 680,
      height: 1000
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Custom Cursor */}
      <Cursor 
        mousePos={mousePos} 
        isDragging={isDragging} 
        showCursor={showCursor} 
      />

      {/* Hero Section with Video */}
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
            src="https://media.rolex.com/video/upload/c_limit,w_2880/f_auto:video/q_auto:eco/v1/rolexcom/new-watches/2025/hub/videos/autoplay/cover/rolex-watches-new-watches-2025-cover-autoplay.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Timeless Elegance</h1>
          <p className="text-xl mb-8 max-w-2xl">Discover our curated collection of premium watches</p>
          <Link href="/shop" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Watches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
              <div className={`relative w-full bg-white flex items-center justify-center p-4 ${index < 3 ? 'h-[22rem]' : 'h-80'}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={product.width}
                  height={product.height}
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={product.placeholder}
                  sizes="(min-width: 80rem) 15vw, (min-width: 48rem) 25vw, 50vw"
                  quality={85}
                  loading="lazy"
                  style={{
                    objectPosition: 'center',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
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
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 rounded-xl p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest products and offers</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}