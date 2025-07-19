import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type ProductListProps = {
  products: Product[];
  title?: string;
};

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  inStock: boolean;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="group relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:opacity-75 transition-opacity"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                <span className="bg-gray-800 text-white px-2 py-1 text-xs font-medium rounded">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm font-medium">
                <Link href={`/products/${product._id}`}>
                  {product.name}
                </Link>
              </h3>
            </div>
            <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}