'use client'
import { useState, useEffect } from 'react';
import { FiClock, FiTag, FiAlertTriangle } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import Cursor from '@/components/Cursor';

const saleItems = [
  {
    id: 1,
    name: 'Classic Leather Pro',
    originalPrice: 349.99,
    salePrice: 249.99,
    discount: '28% OFF',
    image: '/classic.jpg',
    timeLeft: '12:45:32',
    stockLeft: 5
  },
  {
    id: 2,
    name: 'Minimalist Silver',
    originalPrice: 299.99,
    salePrice: 199.99,
    discount: '33% OFF',
    image: '/Minimaliist.jpg',
    timeLeft: '08:22:17',
    stockLeft: 3
  },
  {
    id: 3,
    name: 'Sport Chronograph',
    originalPrice: 399.99,
    salePrice: 299.99,
    discount: '25% OFF',
    image: '/Sports.jpg',
    timeLeft: '23:15:08',
    stockLeft: 8
  },
  {
    id: 4,
    name: 'Vintage Heritage',
    originalPrice: 449.99,
    salePrice: 349.99,
    discount: '22% OFF',
    image: '/Vintage.jpg',
    timeLeft: '05:42:51',
    stockLeft: 2
  }
];

export default function SalePage() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Custom Cursor */}
      <Cursor 
        mousePos={mousePos} 
        isDragging={isDragging} 
        showCursor={showCursor} 
      />

      {/* Hero Banner */}
      <div className="relative bg-gray-600 rounded-xl overflow-hidden mb-12 h-[500px] md:h-[600px]">
        <Image
          src="/sale.jpg"
          alt="About WatchHub"
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
            <span className="text-white font-bold text-lg">FLASH SALE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">End of Season Sale</h1>
          <p className="text-lg max-w-2xl text-white/90">
            Limited time offers on premium watches - Up to 50% off!
          </p>
          <div className="flex items-center mt-6 bg-black/30 px-4 py-2 rounded-full">
            <FiClock className="text-white mr-2" />
            <span className="text-white font-medium">Ends in 2 days 14:32:15</span>
          </div>
        </div>
      </div>

      {/* Sale Countdown Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-center">
        <FiAlertTriangle className="text-yellow-600 text-xl mr-3" />
        <p className="text-yellow-800">
          <span className="font-semibold">Hurry!</span> These deals won't last. Sale ends soon.
        </p>
      </div>

      {/* Sale Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {saleItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group relative hover:-translate-y-1"
          >
            {/* Sale Badge */}
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
              {item.discount}
            </div>
            
            {/* Low Stock Warning */}
            {item.stockLeft < 5 && (
              <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded text-xs font-bold z-10">
                Only {item.stockLeft} left
              </div>
            )}

            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              
              {/* Price */}
              <div className="flex items-center mb-2">
                <span className="text-black-600 font-bold text-xl mr-2">${item.salePrice.toFixed(2)}</span>
                <span className="text-gray-400 line-through text-sm">${item.originalPrice.toFixed(2)}</span>
              </div>
              
              {/* Countdown */}
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <FiClock className="mr-1" />
                <span>Sale ends in {item.timeLeft}</span>
              </div>
              
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sale Terms */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FiTag className="mr-2" /> Sale Terms & Conditions
        </h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Sale prices valid until inventory lasts or until sale end date</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>No price adjustments on previous purchases</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Limited quantities available</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Normal return policy applies to sale items unless marked "final sale"</span>
          </li>
        </ul>
      </div>

      {/* More Deals */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">More Great Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Mechanical', 'Smart', 'Diving', 'Luxury'].map((category) => (
            <Link 
              key={category} 
              href={`/shop?category=${category.toLowerCase()}&sale=true`}
              className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gray-100 h-32 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 hover:scale-105">
                  <span className="text-gray-400">+</span>
                </div>
              </div>
              <span className="font-medium">{category} Watches on Sale</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Email Signup */}
      <div className="bg-black text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Get Early Access to Sales</h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about exclusive deals and private sales.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-black"
          />
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}