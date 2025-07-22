"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'

interface SearchFiltersProps {
  categories: string[]
  priceRange: { min: number; max: number }
  brands?: string[]
  ratings?: number[]
  onFilterChange?: (filters: any) => void
}

type FilterState = {
  category: string
  priceMin: string | number
  priceMax: string | number
  brand: string[]
  rating: string[]
  [key: string]: any
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  categories,
  priceRange,
  brands = [],
  ratings = [5, 4, 3, 2, 1],
  onFilterChange,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Helper to get an array from param
  const getArrayParam = (param: string | null) =>
    param ? param.split(',') : []

  // On mount: set initial filters from query params
  const [selectedFilters, setSelectedFilters] = useState<FilterState>(() => ({
    category: searchParams.get('category') || '',
    priceMin: searchParams.get('priceMin') || priceRange.min,
    priceMax: searchParams.get('priceMax') || priceRange.max,
    brand: getArrayParam(searchParams.get('brand')),
    rating: getArrayParam(searchParams.get('rating')),
  }))

  // Sync to query string when params change (for SSR navigation or reload)
  useEffect(() => {
    setSelectedFilters({
      category: searchParams.get('category') || '',
      priceMin: searchParams.get('priceMin') || priceRange.min,
      priceMax: searchParams.get('priceMax') || priceRange.max,
      brand: getArrayParam(searchParams.get('brand')),
      rating: getArrayParam(searchParams.get('rating')),
    })
    // eslint-disable-next-line
  }, [searchParams])

  // Helper: Build URL with new filters
  const buildQueryString = (filters: FilterState) => {
    const params = new URLSearchParams()
    if (filters.category) params.set('category', filters.category)
    if (filters.priceMin && filters.priceMin !== priceRange.min) params.set('priceMin', String(filters.priceMin))
    if (filters.priceMax && filters.priceMax !== priceRange.max) params.set('priceMax', String(filters.priceMax))
    if (filters.brand.length) params.set('brand', filters.brand.join(','))
    if (filters.rating.length) params.set('rating', filters.rating.join(','))
    return params.toString()
  }

  // Change filters
  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: value,
    }
    setSelectedFilters(newFilters)

    // Update URL
    const queryString = buildQueryString(newFilters)
    router.push(queryString ? `${pathname}?${queryString}` : pathname)

    if (onFilterChange) onFilterChange(newFilters)
  }

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = parseFloat(e.target.value)
    handleFilterChange(
      type === 'min' ? 'priceMin' : 'priceMax',
      Math.min(Math.max(value, priceRange.min), priceRange.max)
    )
  }

  const toggleBrand = (brand: string) => {
    const newBrands = selectedFilters.brand.includes(brand)
      ? selectedFilters.brand.filter((b: string) => b !== brand)
      : [...selectedFilters.brand, brand]
    handleFilterChange('brand', newBrands)
  }

  const toggleRating = (rating: number) => {
    const ratingStr = rating.toString()
    const newRatings = selectedFilters.rating.includes(ratingStr)
      ? selectedFilters.rating.filter((r: string) => r !== ratingStr)
      : [...selectedFilters.rating, ratingStr]
    handleFilterChange('rating', newRatings)
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      category: '',
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      brand: [],
      rating: [],
    })
    router.push(pathname)
    if (onFilterChange) onFilterChange({
      category: '',
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      brand: [],
      rating: [],
    })
  }

  return (
    <div className="relative">
      {/* Mobile filter button */}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 border rounded-md text-sm font-medium"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {/* Filters sidebar */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-0 z-50 lg:z-auto bg-white lg:bg-transparent p-4 lg:p-0 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h3 className="text-lg font-bold">Filters</h3>
          <button onClick={() => setIsMobileFiltersOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="radio"
                    name="category"
                    checked={selectedFilters.category === category}
                    onChange={() => handleFilterChange('category', category)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">${selectedFilters.priceMin}</span>
              <span className="text-sm text-gray-600">${selectedFilters.priceMax}</span>
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={selectedFilters.priceMin}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-full p-2 border rounded text-sm"
                placeholder="Min"
              />
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={selectedFilters.priceMax}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-full p-2 border rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Brands */}
          {brands.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Brands</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      id={`brand-${brand}`}
                      type="checkbox"
                      checked={selectedFilters.brand.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ratings */}
          <div>
            <h4 className="font-medium mb-2">Customer Ratings</h4>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    id={`rating-${rating}`}
                    type="checkbox"
                    checked={selectedFilters.rating.includes(rating.toString())}
                    onChange={() => toggleRating(rating)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {rating < 5 && <span className="ml-1">& Up</span>}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Clear All button */}
          {(selectedFilters.category ||
            selectedFilters.brand.length > 0 ||
            selectedFilters.rating.length > 0 ||
            selectedFilters.priceMin !== priceRange.min ||
            selectedFilters.priceMax !== priceRange.max) && (
            <button
              onClick={clearAllFilters}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsMobileFiltersOpen(false)}
        />
      )}
    </div>
  )
}

export default SearchFilters
