// pages/api/products/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mockProducts } from '@/lib/mockData'; // Your product data source

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { category, priceMin, priceMax, brand, rating } = req.query;
    
    let filteredProducts = [...mockProducts];

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(
        p => p.category.toLowerCase() === category.toString().toLowerCase()
      );
    }

    if (priceMin || priceMax) {
      const min = priceMin ? parseFloat(priceMin.toString()) : 0;
      const max = priceMax ? parseFloat(priceMax.toString()) : Number.MAX_VALUE;
      filteredProducts = filteredProducts.filter(
        p => p.price >= min && p.price <= max
      );
    }

    if (brand) {
      const brands = Array.isArray(brand) ? brand : [brand];
      filteredProducts = filteredProducts.filter(
        p => brands.includes(p.brand)
      );
    }

    if (rating) {
      const ratings = Array.isArray(rating) 
        ? rating.map(r => parseInt(r))
        : [parseInt(rating)];
      filteredProducts = filteredProducts.filter(
        p => p.rating && ratings.some(r => Math.floor(p.rating) >= r)
      );
    }

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}