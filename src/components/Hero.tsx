import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className='min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black gap-8 md:gap-16'>
      {/* Text Content */}
      <div className='flex flex-col items-center md:items-start text-center md:text-left max-w-md lg:max-w-xl space-y-4 md:space-y-6'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
          Timeless Elegance on Your Wrist
        </h1>
        <p className='text-lg text-gray-600'>
          Discover the perfect blend of style and functionality with our exquisite watch collection.
        </p>
        <Link href="/collection" passHref>
          <button className='px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors'>
            Shop the Collection
          </button>
        </Link>
      </div>

      {/* Image - Replace with your actual image */}
      <div className='relative w-full max-w-md lg:max-w-2xl aspect-square'>
        <Image
          src="/images2.jpg" // Replace with your image path
          alt="Luxury Watch Collection"
          fill
          className='object-cover rounded-lg'
          priority
        />
      </div>
    </div>
  );
};

export default Hero;